import * as React from 'react'
import {observer} from 'mobx-react'

import * as FormElement from './FormElement'
import {createKey} from '../util'

interface ChildProps {
    definition: FormElement.FormElementDef<{}>
    parentFieldPath: string
}

export function createFiledPath(parentFieldPath: string, fieldId?: string): string {
    if (parentFieldPath) {
        return parentFieldPath + '.' + fieldId
    } else {
        return fieldId ? fieldId : ''
    }
}
export const Child = observer((props: ChildProps) => {
    // tslint:disable-next-line
    let Child: any = FormElement.FormElements[props.definition.type]
    const fieldPath: string = createFiledPath(props.parentFieldPath, props.definition.fieldId)
    return <Child definition={props.definition} parentFieldPath={props.parentFieldPath} fieldPath={fieldPath}/>
})

interface ChildrenProps {
    children: FormElement.FormElementDef<{}>[]
    parentFieldPath: string
}

export const Children = observer((props: ChildrenProps) => (
    <div>
        {props.children.map((elementDef: FormElement.FormElementDef<{}>) => {
            return <Child definition={elementDef} parentFieldPath={props.parentFieldPath} key={createKey()}/>
        })}
    </div>))
