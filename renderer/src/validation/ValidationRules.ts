import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'

export interface ValidationRuleDef {
    name: string,
    arguments?: string[],
    options?: {}
    message?: string
}

interface RuleValidator {
    validate: (value: string, args?: string[]) => boolean,
    defaultMessage: string
}

export const ruleValidatorMap: { [name: string]: RuleValidator } = {
    email: {
        validate: (value: string) => isEmail(value),
        defaultMessage: 'Please enter a email address'
    },
    alpha: {
        validate: (value: string) => isAlpha(value),
        defaultMessage: 'Please enter only letters'
    },
    numeric: {
        validate: (value: string) => isNumeric(value),
        defaultMessage: 'Please enter only numbers'
    },
    alphanumeric: {
        validate: (value: string) => isAlphanumeric(value),
        defaultMessage: 'Please enter only letters and numbers'
    },
    currency: {
        validate: (value: string) => isCurrency(value),
        defaultMessage: 'Please enter a currency amount'
    }
}