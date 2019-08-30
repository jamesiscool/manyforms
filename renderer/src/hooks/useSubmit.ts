import axios from 'axios'
import {useFormDef} from './useFormDef'
import {useFormState} from './useFormState'
import {useValues} from './useValues'

export const useSubmit = () => {
	const {formDef} = useFormDef()
	const {values} = useValues()
	const {formState, setFormState} = useFormState()


	return {
		submitting: formState.submitting,
		submit: () => {
			setFormState('submitting', true)
			axios.post(formDef.submit.url, values)
				.then(function (response) {
					console.log(response)
					setFormState('submitting', false)
					const outcomeIndex = formDef.submit.outcomes.findIndex((outcome) => {
						if (outcome.statusCodes.includes(response.status)) {
							return true
						}
						return false
					})
					setFormState('outcomeIndex', outcomeIndex)
				}).catch(function (error) {
				console.log('error:', error)
			})

		}
	}
}
