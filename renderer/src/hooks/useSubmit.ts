import axios from 'axios'
import {useState} from 'react'
import {useFormDef} from './useFormDef'
import {useValues} from './useValues'

export const useSubmit = () => {
	const {formDef} = useFormDef()
	const {values} = useValues()
	const [submitting, setSubmitting] = useState(false)

	return {
		submitting,
		submit: () => {
			setSubmitting(true)
			axios.post(formDef.submit.url, values)
				.then(function (response) {
					console.log(response)
					setSubmitting(false)
				})

		}
	}
}
