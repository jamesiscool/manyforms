import {createContainer, useContainer} from 'unstated-next'
import {FormElementDef} from '../FormDef'
import {ExpressionContainer} from './ExpressionContainer'

function useShowIf() {
    //const config = useContainer(ConfigContainer).config
    const expressionContainer = useContainer(ExpressionContainer)

    function shouldShow(path: string, fieldDef: FormElementDef<{}>): boolean {
        console.log('path:', path)
        if (!fieldDef.showIf) {
            return true
        }
        return fieldDef.showIf.some(expression => expressionContainer.evaluate(path, fieldDef, expression))
    }
    return {shouldShow}
}

export const ShowIfContainer = createContainer(useShowIf)