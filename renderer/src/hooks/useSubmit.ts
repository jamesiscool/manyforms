import {SubmitRequest, SubmitResponse} from '@manyforms/common'
import axios, {AxiosResponse} from 'axios'
import {useFormDef} from './useFormDef'
import {useFormState} from './useFormState'
import {useValues} from './useValues'

export let useSubmit: () => { submitting: boolean | undefined; submit: () => void }
useSubmit = () => {
	const {formDef} = useFormDef()
	const {values} = useValues()
	const {formState, setFormState} = useFormState()


	return {
		submitting: formState.submitting,
		submit: () => {
			setFormState('submitting', true)
			axios.post<SubmitRequest, AxiosResponse<SubmitResponse>>(
				formDef.submit.url,
				{
					formId: formDef.formId,
					formVersion: formDef.formVersion,
					data: values
				} as SubmitRequest)
				.then(function (response) {
					console.log(response)
					setFormState('submitting', false)
					setFormState('submitResponse', response)
					const outcomeIndex = formDef.submit.outcomes.findIndex(outcome =>
						(outcome.statusCodes?.includes(response.status) || outcome.outcomeId === response.data.outcomeId))
					setFormState('outcomeIndex', outcomeIndex)
				}).catch(function (error) {
				setFormState('submitError', error)
				console.error('error:', error)
			})

		}
	}
}
