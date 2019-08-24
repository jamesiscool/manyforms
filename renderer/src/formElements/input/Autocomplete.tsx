import Octicon, {Search} from '@primer/octicons-react'
import React, {KeyboardEvent, useEffect, useRef, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {FieldChrome} from '../../display/FieldChrome'
import {useFieldState} from '../../hooks/useFieldState'
import {useSuggestion} from '../../hooks/useSuggestion'
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
	postfixSearchIcon?: boolean

}

const defaultAutocompleteAttributes = {
	options: [],
	multiple: false,
	labelKey: 'label',
	valueKey: 'value',
	postfixSearchIcon: true
}

export const Autocomplete = (props: FormElementProps<AutocompleteAttributes>) => {
	const attributes = {...defaultAutocompleteAttributes, ...props.definition.attributes}

	const {focus, blur} = useFieldState()
	const {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption} = useSuggestion(props.path, attributes)
	const [cursor, setCursor] = useState<number>(-1)

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
		blur(props.path)
		setTimeout(() => {
			const newTarget = document.activeElement
			if (!inputContainerRef.current!.contains(newTarget) && !suggestionsContainerRef.current!.contains(newTarget)) {
				clear()
			}
		}, 1)// Have to wait 1 ms so that document.activeElement is not body
	}
	const handleFocus = () => {
		focus(props.path)
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
				{({ref}) => (<div ref={inputContainerRef} className="input-group">
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
						/>
						{attributes.postfixSearchIcon && <div className="input-group-append" onClick={() => inputChanged(inputValue)}>
							<span className="input-group-text">
								<Octicon icon={Search} size='small'/>
							</span>
						</div>}
					</div>
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