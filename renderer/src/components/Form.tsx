import * as React from 'react'
/*import set = require('lodash/set')
 import get = require('lodash/get')*/

import {FormElementDef} from './FormElement'
import {Children} from './Children'

export interface FormProps {
    formElements: Array<FormElementDef<{}>>
}

export const Form = (props: FormProps) =>
    <div className="form">
        <Children children={props.formElements}/>
    </div>