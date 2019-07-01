import React from 'react'
import {createFiledPath} from '../util'
import {FormElementDef} from './FormElementDef'
import {lookupElement} from './formElementTypes'

interface ChildFormElementsProps {
    childFormElements: FormElementDef<any>[]
    parentPath: string
}

export const ChildFormElements = (props: ChildFormElementsProps) => {
    return (
        <div>
            {props.childFormElements.map((elementDef, index) => {
                const Child: any = lookupElement(elementDef.type)
                return React.createElement(Child, {
                    definition: elementDef,
                    parentPath: props.parentPath,
                    path: createFiledPath(props.parentPath, elementDef.fieldId),
                    key: props.parentPath + '_' + index
                })
            })}
        </div>)
}