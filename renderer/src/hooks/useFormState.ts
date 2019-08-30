import {useStore} from './useStore'

type FormState = {
	nextClicked?: number //Date.now()
	submitClicked?: number
	submitting?: boolean
	outcomeIndex?: number
}

const FORM_STATE_STORE_KEY = 'formState'

export const useFormState = () => {
	const {set, get} = useStore()
	const setFormState = (path: keyof FormState, value: any) => {
		set(`${FORM_STATE_STORE_KEY}.${path}`, value)
	}

	return {
		formState: get<FormState>(FORM_STATE_STORE_KEY, {}),
		setFormState,
		nextClicked: () => {
			if (!get(FORM_STATE_STORE_KEY + '.nextClicked')) {
				setFormState('nextClicked', Date.now())
			}
		},
		clearNextClicked: () => {
			setFormState('nextClicked', undefined)
		},
		submitClicked: () => {
			if (!get(FORM_STATE_STORE_KEY + '.submitClicked')) {
				setFormState('submitClicked', Date.now())
			}
		},
		nextOrSubmit: (): boolean => {
			return (get(FORM_STATE_STORE_KEY + '.nextClicked') || get(FORM_STATE_STORE_KEY + '.submitClicked'))
		}
	}
}