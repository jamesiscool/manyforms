import * as React from 'react'
import DevTools from 'mobx-react-devtools'

import {FormElementDef} from './FormElement'
import {Children} from './Children'

export interface FormProps {
    formElements: Array<FormElementDef<{}>>
}

export const Form = (props: FormProps) => (
    <div className="form pb-5">
        <Children children={props.formElements} parentFieldPath=""/>
        <DevTools/>
    </div>)