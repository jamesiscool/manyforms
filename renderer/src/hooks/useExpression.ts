import jexl from 'jexl'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'
import {ElementDef} from '../FormDef'
import {useConfig} from './useConfig'
import {useStore} from './useStore'
import {VALUES_STORE_KEY} from './useValues'

//Transforms
jexl.addTransform('toUpperCase', (value) => value.toUpperCase())
jexl.addTransform('toLowerCase', (value) => value.toLowerCase())

//'Is' validation
jexl.addTransform('isAlpha', (value) => value && isAlpha(value))
jexl.addTransform('isAlphanumeric', (value) => value && isAlphanumeric(value))
jexl.addTransform('isCurrency', (value) => value && isCurrency(value))
jexl.addTransform('isEmail', (value) => value && isEmail(value))
jexl.addTransform('isNumeric', (value) => value && isNumeric(value))

//case-insensitive string equality
jexl.addBinaryOp('_=', 20, (left, right) => left.toLowerCase() === right.toLowerCase())

export const useExpression = () => {
	const {config} = useConfig()
	const {store, get} = useStore()

	return {
		evaluate: <T>(expression: string, path?: string, def?: ElementDef, extraContex?: any, includeFieldValue = true): T => {
			const context = {
				...store,
				def,
				path,
				config,
				...extraContex
			}
			if (includeFieldValue) {
				const fieldValue = get(`${VALUES_STORE_KEY}.${path}`)
				context.fieldValue = fieldValue
				context.value = fieldValue
			}
			return jexl.evalSync(expression, context)
		}
	}
}