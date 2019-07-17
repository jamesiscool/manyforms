import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'

interface ValidationRule {
	validate: (value: string, args?: string | string[]) => boolean,
	defaultMessage: string
}

export const validationRuleMap: { [name: string]: ValidationRule } = {
	required: {
		validate: (value: string) => !(value == null || value.length <= 0 || value === ''),
		defaultMessage: 'This field is required'
	},
	email: {
		validate: (value: string) => isEmail(value),
		defaultMessage: 'This field must be an email address'
	},
	alpha: {
		validate: (value: string) => isAlpha(value),
		defaultMessage: 'This field must be only letters'
	},
	numeric: {
		validate: (value: string) => isNumeric(value),
		defaultMessage: 'This field must be only numbers'
	},
	alphanumeric: {
		validate: (value: string) => isAlphanumeric(value),
		defaultMessage: 'This field must be only letters and numbers'
	},
	currency: {
		validate: (value: string) => isCurrency(value),
		defaultMessage: 'This field must be a currency amount'
	}
}