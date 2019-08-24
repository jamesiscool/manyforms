import axios from 'axios'
import {useEffect, useState} from 'react'
import {useFieldState} from './useFieldState'
import {useReferenceData} from './useReferenceData'
import {useValues} from './useValues'

interface SuggestAttributes {
	options?: any[]
	referenceDataOptions?: string
	multiple?: boolean
	labelKey?: string
	valueKey?: string
	http?: { url?: string }
}

export function useSuggestion(path: string, attributes: SuggestAttributes) {
	const {referenceData} = useReferenceData()
	const {setValue} = useValues()
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

			const referenceDataOptions = (attributes.referenceDataOptions && referenceData[attributes.referenceDataOptions]) || []
			const inlineOptions = attributes.options!.concat(referenceDataOptions)

			const matchingInlineOptions = inlineOptions.filter(option => {
				return JSON.stringify(option).toLowerCase().includes(lowerInputValue)
			})

			setInlineSuggestions(matchingInlineOptions)

			if (attributes.http && attributes.http.url) {
				axios.get<any[]>(attributes.http.url + newInputValue)
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

			if (attributes.valueKey) {
				setValue(path, option[attributes.valueKey])
			}
			setSelectedSuggestionLabel(path, option[attributes.labelKey || 'label'])
			setInputValue(option[attributes.labelKey || 'label'])

		}
		setShowSuggestions(false)
	}

	return {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption}
}