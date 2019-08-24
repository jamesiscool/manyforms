import {useStore} from './useStore'

type FormState = {
	nextClicked?: number //Date.now()
	submitClicked?: number
}

const FORM_STATE_STORE_KEY = 'formState'

export const useFormState = () => {
	const {set, get} = useStore()

	return {
		fromState: get<FormState>(FORM_STATE_STORE_KEY),
		nextClicked: () => {
			if (!get(FORM_STATE_STORE_KEY + '.nextClicked')) {
				set(FORM_STATE_STORE_KEY + '.nextClicked', Date.now())
			}
		},
		clearNextClicked: () => {
			set(FORM_STATE_STORE_KEY + '.nextClicked', undefined)
		},
		submitClicked: () => {
			if (!get(FORM_STATE_STORE_KEY + '.submitClicked')) {
				set(FORM_STATE_STORE_KEY + '.submitClicked', Date.now())
			}
		},
		nextOrSubmit: (): boolean => {
			return (get(FORM_STATE_STORE_KEY + '.nextClicked') || get(FORM_STATE_STORE_KEY + '.submitClicked'))
		}
	}
}