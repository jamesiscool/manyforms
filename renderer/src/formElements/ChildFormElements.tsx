import React from 'react'
import {createFiledPath} from '../util'
import {FormElementDef} from './FormElementDef'
import {lookupElement} from './formElementTypes'

interface ChildFormElementsProps {
    childFormElements: FormElementDef<any>[]
    parentFieldPath: string
}

export const ChildFormElements = (props: ChildFormElementsProps) => {
    //console.log('ChildFormElements', props)
    return (
        <div>
            {props.childFormElements.map((elementDef, index) => {
                const Child: any = lookupElement(elementDef.type)
                return React.createElement(Child, {
                    definition: elementDef,
                    parentFieldPath: props.parentFieldPath,
                    fieldPath: createFiledPath(props.parentFieldPath, elementDef.fieldId),
                    key: props.parentFieldPath + '_' + index
                })
            })}
        </div>)
}