import React from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {ValidationContainer} from './state/ValidationContainer'
import {ValuesContainer} from './state/ValuesContainer'

export interface FormProps {
    formDef: FormDef
}

export const Form = (props: FormProps) =>
    (<div className="p-2 container">
        <ValuesContainer.Provider>
            <ValidationContainer.Provider>
                <ChildFormElements childFormElements={props.formDef.elements} parentFieldPath=""/>
            </ValidationContainer.Provider>
        </ValuesContainer.Provider>
    </div>)