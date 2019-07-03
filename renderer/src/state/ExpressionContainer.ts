import jexl from 'jexl'
import {createContainer, useContainer} from 'unstated-next'
import isAlpha from 'validator/lib/isAlpha'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isCurrency from 'validator/lib/isCurrency'
import isEmail from 'validator/lib/isEmail'
import isNumeric from 'validator/lib/isNumeric'
import {FormElementDef} from '../FormDef'
import {validationRuleMap} from '../validation/ValidationRule'
import {ConfigContainer} from './ConfigContainer'
import {ValuesContainer} from './ValuesContainer'

//Basic transforms
jexl.addTransform('toUpperCase', (val) => val.toUpperCase())
jexl.addTransform('toLowerCase', (val) => val.toLowerCase())

//Transform as a boolean validation
jexl.addTransform('isAlpha', (val) => isAlpha(val))
jexl.addTransform('isAlphanumeric', (val) => isAlphanumeric(val))
jexl.addTransform('isCurrency', (val) => isCurrency(val))
jexl.addTransform('isEmail', (val) => isEmail(val))
jexl.addTransform('isNumeric', (val) => isNumeric(val))

//case-insensitive string equality
jexl.addBinaryOp('_=', 20, (left, right) => left.toLowerCase() === right.toLowerCase())

interface ValidationExpression {
    validate: (path: string, fieldDef: FormElementDef<{}>, expression: string) => boolean,
    defaultMessage: string
}

function useExpression() {
    const config = useContainer(ConfigContainer).config
    const valuesContainer = useContainer(ValuesContainer)


    const evaluate = <T>(path: string, fieldDef: FormElementDef<{}>, expression: string): T => {
        const fieldValue = valuesContainer.getValue(path)
        const context = {
            formValues: valuesContainer.formValues,
            fieldValue,
            value: fieldValue,
            config,
            fieldDef
        }
        return jexl.evalSync(expression, context)
    }

    const expressionValidations: { [name: string]: ValidationExpression } = {
        validIf: {
            validate: (path: string, fieldDef: FormElementDef<{}>, expression: string) => evaluate(path, fieldDef, expression),
            defaultMessage: 'This field is invalid' // The form editor should make the user enter message as this does not give the user any information about why the field is invalid
        },
        invalidIf: {
            validate: (path: string, fieldDef: FormElementDef<{}>, expression: string) => !evaluate(path, fieldDef, expression),
            defaultMessage: 'This field is invalid' // As with validIf form editor should make the user enter message as this does not give the user any information about why the field is invalid
        },
        requiredIf: {
            validate: (path: string, fieldDef: FormElementDef<{}>, expression: string) => {
                if (evaluate(path, fieldDef, expression)) {
                    return validationRuleMap.required.validate(valuesContainer.getValue(path))
                }
                return true
            },
            defaultMessage: validationRuleMap.required.defaultMessage
        }
    }

    return {evaluate, expressionValidations}
}

export const ExpressionContainer = createContainer(useExpression)