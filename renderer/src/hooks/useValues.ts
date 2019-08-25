import {FormElementDef} from '../FormDef'
import {useExpression} from './useExpression'
import {useFieldState} from './useFieldState'
import {useStore} from './useStore'

export const VALUES_STORE_KEY = 'values'

export const useValues = () => {
	const store = useStore()
	const {valueChanged} = useFieldState()
	const {evaluate} = useExpression()

	const setValue = (path: string, value: any) => {
		store.set(`${VALUES_STORE_KEY}.${path}`, value)
		valueChanged(path)
	}


	return {
		formValues: store.get(VALUES_STORE_KEY),
		setValue,
		getValue: (path: string): string => {
			return store.get(`${VALUES_STORE_KEY}.${path}`)
		},
		addToCollection: (path: string, element: any = {}) => {
			setValue(`${path}[${store.getArrayLength(`${VALUES_STORE_KEY}.${path}`)}]`, element)
		},
		deleteFromCollection: (path: string, index: number) => {
			store.deleteFromCollection(`${VALUES_STORE_KEY}.${path}`, index)
		},
		getCollectionSize: (path: string) => {
			return store.getArrayLength(`${VALUES_STORE_KEY}.${path}`)
		},
		setValueExpression: (path: string, fieldDef: FormElementDef<{}>, expresion: string, extraContext?: any) => {
			setValue(path, evaluate(path, fieldDef, expresion, false, extraContext))
		},
		setUp: (initialValues = {}) => {
			store.set(VALUES_STORE_KEY, initialValues)
		}
	}
}