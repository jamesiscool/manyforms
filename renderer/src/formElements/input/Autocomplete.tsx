import React, {KeyboardEvent, useEffect, useRef, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {FieldChrome} from '../../display/FieldChrome'
import {useSuggestion} from '../../hooks/useSuggestion'
import {FieldStateContainer} from '../../state/FieldStateContainer'
import {useContainer} from '../../state/useContainer'
import {FormElementProps} from '../FormElementProps'

export interface AutocompleteAttributes {
	label: string
	description: string
	info?: string
	options?: any[]
	referenceDataOptions?: string
	multiple?: boolean
	labelKey?: string
	valueKey?: string
	http?: { url?: string }
}

const defaultAutocompleteAttributes = {
	options: [],
	multiple: false,
	labelKey: 'label',
	valueKey: 'value'
}

export const Autocomplete = (props: FormElementProps<AutocompleteAttributes>) => {
	const attributes = {...defaultAutocompleteAttributes, ...props.definition.attributes}
	const fieldStateContainer = useContainer(FieldStateContainer)
	const [cursor, setCursor] = useState<number>(-1)

	const {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption} = useSuggestion(props.path, attributes)


	const inputContainerRef = useRef<HTMLDivElement>(null)
	const suggestionsContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (showSuggestions && suggestions && suggestions.length > 0) {
			inputContainerRef.current!.scrollIntoView()
		}
	}, [showSuggestions, suggestions])

	useEffect(() => {
		document.body.addEventListener('touchend', handlePotentialOutsideClick!)
		document.body.addEventListener('click', handlePotentialOutsideClick!)
		return () => {
			document.body.removeEventListener('touchend', handlePotentialOutsideClick!)
			document.body.removeEventListener('click', handlePotentialOutsideClick!)
		}
	})

	const handlePotentialOutsideClick = (event: Event) => {
		if (inputContainerRef && !inputContainerRef.current!.contains(event.target as Node)
			&& suggestionsContainerRef && !suggestionsContainerRef.current!.contains(event.target as Node)) {
			clear()
		}
	}
	const handleInputChange = (changedValue: string) => {
		inputChanged(changedValue)
		setCursor(-1)
	}
	const handleSelectionClicked = (option: any) => {
		selectOption(option)
		setCursor(-1)
	}
	const handleBlur = () => {
		fieldStateContainer.blur(props.path)
		setTimeout(() => {
			const newTarget = document.activeElement
			if (!inputContainerRef.current!.contains(newTarget) && !suggestionsContainerRef.current!.contains(newTarget)) {
				clear()
			}
		}, 1)// Have to wait 1 ms so that document.activeElement is not body
	}
	const handleFocus = () => {
		fieldStateContainer.focus(props.path)
		if (inputValue && inputValue.length > 0) {
			handleInputChange(inputValue)
		}
	}
	const handleInputKeyDown = (event: KeyboardEvent) => {
		if (event.keyCode === 38 && cursor > 0) { // up
			setCursor(cursor - 1)
		} else if (event.keyCode === 40 && cursor < suggestions.length - 1) { // down
			setCursor(cursor + 1)
		} else if (event.keyCode === 13 && cursor >= 0 && cursor < suggestions.length) { // enter
			selectOption(suggestions[cursor])
		} else if (event.keyCode === 27) { // esc
			clear()
		}
	}


	return <FieldChrome path={props.path} def={props.definition}>
		<Manager>
			<Reference>
				{({ref}) => (<div ref={inputContainerRef}>
						<input
							ref={ref}
							type="text"
							className="form-control"
							id={props.path}
							aria-describedby={props.path + '_description'}
							value={inputValue || ''}
							onChange={event => handleInputChange(event.target.value)}
							onKeyDown={handleInputKeyDown}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/></div>
				)}
			</Reference>
			<Popper placement="bottom-start">
				{({ref, style, placement}) => (
					<div ref={suggestionsContainerRef}>
						<div ref={ref} style={style} className="popper" data-placement={placement}>
							{showSuggestions && suggestions && suggestions.length > 0 && <div className="dropdown-menu show">
								{suggestions.map((suggestion, index) => {
									const value = suggestion[attributes.valueKey]
									const label = suggestion[attributes.labelKey]
									return <button className={'dropdown-item' + (cursor === index ? ' active' : '')} key={value + label} onClick={() => handleSelectionClicked(suggestion)}>{label}</button>
								})}
							</div>}
						</div>
					</div>
				)}
			</Popper>
		</Manager>
	</FieldChrome>
}