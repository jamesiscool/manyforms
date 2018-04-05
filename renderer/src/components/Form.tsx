import * as React from 'react'
import { Children } from './Children'
import { FormElementDef } from './FormElement'

export interface FormProps {
    formElements: Array<FormElementDef<{}>>
}

export const Form = (props: FormProps) => (
    <div className="pb-2">
        <Children children={props.formElements} parentFieldPath=""/>
    </div>)