import * as isAlpha from 'validator/lib/isAlpha'
import * as isAlphanumeric from 'validator/lib/isAlphanumeric'
import * as isCurrency from 'validator/lib/isCurrency'
import * as isEmail from 'validator/lib/isEmail'

export default {
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