import axios from 'axios'
import {useEffect, useState} from 'react'
import {FieldDef} from '../FormDef'
import {useFieldState} from './useFieldState'
import {useReferenceData} from './useReferenceData'
import {useValues} from './useValues'

export interface SuggestDef extends FieldDef {
	options?: any[]
	referenceDataOptions?: string
	multiple?: boolean
	labelKey?: string
	valueKey?: string
	valueIsWholeOption?: boolean
	valueExpression?: string
	http?: { url?: string }
}

export function useSuggestion(path: string, def: SuggestDef) {
	const {referenceData} = useReferenceData()
	const {setValue, setValueExpression} = useValues()
	const {getFieldState, setSelectedSuggestionLabel} = useFieldState()
	const fieldState = getFieldState(path)

	const [suggestions, setSuggestions] = useState<any[]>([])
	const [httpSuggestions, setHttpSuggestions] = useState<any[]>([])
	const [inlineSuggestions, setInlineSuggestions] = useState<any[]>([])
	const [inputValue, setInputValue] = useState<string>(fieldState.selectedSuggestionLabel || '')
	const [showSuggestions, setShowSuggestions] = useState(false)

	useEffect(() => {
		setSuggestions(inlineSuggestions.concat(httpSuggestions))
	}, [inlineSuggestions, httpSuggestions])

	const inputChanged = (newInputValue: string) => {
		setInputValue(newInputValue)
		setInlineSuggestions([])
		setHttpSuggestions([])
		setSuggestions([])
		const lowerInputValue = newInputValue.trim().toLowerCase()
		const lowerSelectedLabel = fieldState.selectedSuggestionLabel && fieldState.selectedSuggestionLabel.toLowerCase()
		if (lowerInputValue !== lowerSelectedLabel && lowerInputValue.length > 0) {
			const referenceDataOptions = (def.referenceDataOptions && referenceData[def.referenceDataOptions]) || []
			const fieldDefOption = def.options || []
			const inlineOptions = referenceDataOptions.concat(fieldDefOption)

			const matchingInlineOptions = inlineOptions.filter((option: any) => {
				return JSON.stringify(option).toLowerCase().includes(lowerInputValue)
			})

			setInlineSuggestions(matchingInlineOptions)

			if (def.http && def.http.url) {
				axios.get<any[]>(def.http.url + newInputValue)
					.then(function (response) {
						setHttpSuggestions(response.data)
					})
			}

			setShowSuggestions(true)
		}
	}

	const clear = () => {
		setShowSuggestions(false)
	}

	const selectOption = (option: any) => {
		if (typeof option === 'string') {
			setValue(path, option)
			setSelectedSuggestionLabel(path, option)
			setInputValue(option)
		} else if (typeof option === 'object') {
			if (def.valueIsWholeOption) {
				setValue(path, option)
			} else if (def.valueExpression) {
				setValueExpression(path, def, def.valueExpression, {option})
			} else if (def.valueKey) {
				setValue(path, option[def.valueKey])
			}
			setSelectedSuggestionLabel(path, option[def.labelKey || 'label'])
			setInputValue(option[def.labelKey || 'label'])

		}
		setShowSuggestions(false)
	}

	return {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption}
}