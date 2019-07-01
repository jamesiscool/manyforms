import React from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {ConfigContainer} from './state/ConfigContainer'
import {FieldStateContainer} from './state/FieldStateContainer'
import {ValidationContainer} from './state/ValidationContainer'
import {ValuesContainer} from './state/ValuesContainer'

export interface FormProps {
    formDef: FormDef
}

export const Form = (props: FormProps) =>
    (<div className="p-2 container">
        <ConfigContainer.Provider initialState={props.formDef.config}>
            <FieldStateContainer.Provider>
                <ValuesContainer.Provider>
                    <ValidationContainer.Provider>
                        <ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
                    </ValidationContainer.Provider>
                </ValuesContainer.Provider>
            </FieldStateContainer.Provider>
        </ConfigContainer.Provider>
    </div>)