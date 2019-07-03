import jexl from 'jexl'
import {createContainer, useContainer} from 'unstated-next'
import {FormElementDef} from '../FormDef'
import {ConfigContainer} from './ConfigContainer'
import {ValuesContainer} from './ValuesContainer'

jexl.addTransform('toUpperCase', (val) => val.toUpperCase())
jexl.addTransform('toLowerCase', (val) => val.toLowerCase())

//case-insensitive string equality
jexl.addBinaryOp('_=', 20, (left, right) => left.toLowerCase() === right.toLowerCase())

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

    return {evaluate}
}

export const ExpressionContainer = createContainer(useExpression)