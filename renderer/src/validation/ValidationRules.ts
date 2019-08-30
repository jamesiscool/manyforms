import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isNumeric from 'validator/lib/isNumeric'

interface ValidationRule {
	validate: (value: string, args?: string | string[]) => boolean,
	defaultMessage: string
}

export const validationRules: { [name: string]: ValidationRule } = {
	required: {
		validate: (value: string) => !(value == null || value.length <= 0 || value === ''),
		defaultMessage: 'This field is required'
	},
	email: {
		validate: (value: string) => isEmpty(value) || isEmail(value),
		defaultMessage: 'This field must be an email address'
	},
	alpha: {
		validate: (value: string) => isEmpty(value) || isAlpha(value),
		defaultMessage: 'This field must be only letters'
	},
	numeric: {
		validate: (value: string) => isEmpty(value) || isNumeric(value),
		defaultMessage: 'This field must be only numbers'
	},
	alphanumeric: {
		validate: (value: string) => isEmpty(value) || isAlphanumeric(value),
		defaultMessage: 'This field must be only letters and numbers'
	},
	currency: {
		validate: (value: string) => isEmpty(value) || isCurrency(value),
		defaultMessage: 'This field must be a currency amount'
	}
}