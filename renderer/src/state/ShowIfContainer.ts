import {createContainer, useContainer} from './useContainer'
import {FormElementDef} from '../FormDef'
import {ExpressionContainer} from './ExpressionContainer'

export const ShowIfContainer = createContainer(() => {
    const expressionContainer = useContainer(ExpressionContainer)

    function shouldShow(path: string, fieldDef: FormElementDef<{}>): boolean {
        if (!fieldDef.showIf) {
            return true
        }
        return fieldDef.showIf.some(expression => expressionContainer.evaluate(path, fieldDef, expression))
    }

    return {shouldShow}
})