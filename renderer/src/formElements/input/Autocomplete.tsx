import React, {KeyboardEvent, useEffect, useRef, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {Description} from '../../display/Description'
import {FieldChrome} from '../../display/FieldChrome'
import {Label} from '../../display/Label'
import {useFieldState} from '../../hooks/useFieldState'
import {SuggestDef, useSuggestion} from '../../hooks/useSuggestion'
import {ReactComponent as Search} from '../../svg/octicons/search.svg'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

export interface AutocompleteDef extends SuggestDef {
	label: string
	description: string
	manualDescription: string
	info?: string
	postfixSearchIcon?: boolean
	showSwitchToManualEntryLink: boolean
	switchToManualEntryLinkLabel?: string
	switchToSuggestLinkLabel?: string
}

const defDefaults: Partial<AutocompleteDef> = {
	options: [],
	multiple: false,
	labelKey: 'label',
	valueKey: 'value',
	postfixSearchIcon: true
}

export const Autocomplete = (props: FormElementProps<AutocompleteDef>) => {
	const def = {...defDefaults, ...props.def}

	const {focus, blur, getFieldState, setShowManualEntryForSuggestion} = useFieldState()
	const {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption} = useSuggestion(props.path, props.def)
	const [cursor, setCursor] = useState<number>(-1)

	const inputContainerRef = useRef<HTMLDivElement>(null)
	const suggestionsContainerRef = useRef<HTMLDivElement>(null)

	const showManualEntryForSuggestion = getFieldState(props.path).showManualEntryForSuggestion

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
		if (!showManualEntryForSuggestion
			&& inputContainerRef && !inputContainerRef.current!.contains(event.target as Node)
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

	if (!showManualEntryForSuggestion) {
		return <>
			<FieldChrome path={props.path} def={props.def}>
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
								{def.postfixSearchIcon && <div className="input-group-append" onClick={() => inputChanged(inputValue)}>
							<span className="input-group-text">
								<Search className="search-icon"/>
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
											let value
											let label
											if (typeof suggestion === 'string') {
												value = suggestion
												label = suggestion
											} else if (typeof suggestion === 'object') {
												value = def.valueKey && suggestion[def.valueKey]
												label = def.labelKey && suggestion[def.labelKey]
											}
											return <button className={'dropdown-item' + (cursor === index ? ' active' : '')} key={value + label} onClick={() => handleSelectionClicked(suggestion)}>{label}</button>
										})}
									</div>}
								</div>
							</div>
						)}
					</Popper>
				</Manager>
			</FieldChrome>
			{def.showSwitchToManualEntryLink &&
			<button className="btn btn-link pt-0 pl-0 manual-entry-link" onClick={() => setShowManualEntryForSuggestion(props.path, true)}>{def.switchToManualEntryLinkLabel}</button>}
		</>
	} else {
		return <div className="form-group pt-2">
			{props.def.label && <Label htmlFor={props.path} text={props.def.label}/>}
			{props.def.children && <div className="card">
				<div className="card-body">
					<button className="btn btn-link pt-0 pl-0 pb-1 mt-n1" onClick={() => setShowManualEntryForSuggestion(props.path, false)}>{def.switchToSuggestLinkLabel}</button>
					<ChildFormElements parentPath={props.path} childFormElements={props.def.children}/>
				</div>
			</div>}
			{props.def.manualDescription && <Description path={props.path} text={props.def.manualDescription}/>}
		</div>
	}
}