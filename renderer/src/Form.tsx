import React from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {ConfigContainer} from './state/ConfigContainer'
import {ExpressionContainer} from './state/ExpressionContainer'
import {FieldStateContainer} from './state/FieldStateContainer'
import {FormStateContainer} from './state/FormStateContainer'
import {ValidationContainer} from './state/ValidationContainer'
import {ValuesContainer} from './state/ValuesContainer'

export interface FormProps {
    formDef: FormDef
}

export const Form = (props: FormProps) =>
    (<div className="p-2 container">
        <ConfigContainer.Provider initialState={props.formDef.config}>
            <FormStateContainer.Provider>
                <FieldStateContainer.Provider>
                    <ValuesContainer.Provider>
                        <ExpressionContainer.Provider>
                            <ValidationContainer.Provider>
                                <ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
                            </ValidationContainer.Provider>
                        </ExpressionContainer.Provider>
                    </ValuesContainer.Provider>
                </FieldStateContainer.Provider>
            </FormStateContainer.Provider>
        </ConfigContainer.Provider>
    </div>)