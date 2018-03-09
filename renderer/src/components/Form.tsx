import * as React from 'react'

import { FormElementDef } from './FormElement'
import { Children } from './Children'

export interface FormProps {
    formElements: Array<FormElementDef<{}>>
}

export const Form = (props: FormProps) => (
    <div className="pb-2">
        <Children children={props.formElements} parentFieldPath=""/>
    </div>)