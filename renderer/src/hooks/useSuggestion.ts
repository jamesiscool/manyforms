import axios from 'axios'
import {useEffect, useState} from 'react'
import {FieldStateContainer} from '../state/FieldStateContainer'
import {ReferenceDataContainer} from '../state/ReferenceDataContainer'
import {useContainer} from '../state/useContainer'
import {ValuesContainer} from '../state/ValuesContainer'

interface SuggestAttributes {
	options?: any[]
	referenceDataOptions?: string
	multiple?: boolean
	labelKey?: string
	valueKey?: string
	http?: { url?: string }
}

export function useSuggestion(path: string, attributes: SuggestAttributes) {
	const referenceDataContainer = useContainer(ReferenceDataContainer)
	const valuesContainer = useContainer(ValuesContainer)
	const fieldStateContainer = useContainer(FieldStateContainer)
	const [suggestions, setSuggestions] = useState<any[]>([])
	const [httpSuggestions, setHttpSuggestions] = useState<any[]>([])
	const [inlineSuggestions, setInlineSuggestions] = useState<any[]>([])
	const [inputValue, setInputValue] = useState<string>(fieldStateContainer.get(path).selectedLabel || '')
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
		const fieldState = fieldStateContainer.get(path)
		const lowerSelectedLabel = fieldState.selectedLabel && fieldState.selectedLabel.toLowerCase()
		if (lowerInputValue !== lowerSelectedLabel && lowerInputValue.length > 0) {

			const referenceDataOptions = (attributes.referenceDataOptions && referenceDataContainer.referenceData[attributes.referenceDataOptions]) || []
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

			valuesContainer.setValue(path, option)
			fieldStateContainer.selectedLabel(path, option)
			setInputValue(option)

		} else if (typeof option === 'object') {

			if (attributes.valueKey) {
				valuesContainer.setValue(path, option[attributes.valueKey])
			}
			fieldStateContainer.selectedLabel(path, option[attributes.labelKey || 'label'])
			setInputValue(option[attributes.labelKey || 'label'])

		}
		setShowSuggestions(false)
	}

	return {inputValue, inputChanged, suggestions, showSuggestions, clear, selectOption}
}