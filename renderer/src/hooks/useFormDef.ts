import {FormDef} from '@manyforms/common'
import {useStore} from './useStore'

const FORM_DEF_STORE_KEY = 'formDef'

export const useFormDef = () => {
	const {set, get} = useStore()
	return {
		formDef: get(FORM_DEF_STORE_KEY) as FormDef,
		setupFormDef: (formDef: FormDef) => {
			set(FORM_DEF_STORE_KEY, formDef)
		}
	}
}