import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'

interface RuleValidator {
    validate: (value: string) => boolean,
    defaultMessage: string
}

export const ruleValidatorMap: { [name: string]: RuleValidator } = {
    email: {
        validate: (value: string) => {
            return isEmail(value)
        },
        defaultMessage: 'Please enter a email address'
    },
    alpha: {
        validate: (value: string) => {
            return isAlpha(value)
        },
        defaultMessage: 'Please enter only letters'
    },
    numeric: {
        validate: (value: string) => {
            return isNumeric(value)
        },
        defaultMessage: 'Please enter only numbers'
    },
    alphanumeric: {
        validate: (value: string) => {
            return isAlphanumeric(value)
        },
        defaultMessage: 'Please enter only letters and numbers'
    },
    currency: {
        validate: (value: string) => {
            return isCurrency(value)
        },
        defaultMessage: 'Please enter a currency amount'
    }
}