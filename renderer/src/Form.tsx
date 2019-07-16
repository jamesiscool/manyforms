import React from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {ConfigContainer} from './state/ConfigContainer'
import {ExpressionContainer} from './state/ExpressionContainer'
import {FieldStateContainer} from './state/FieldStateContainer'
import {FormStateContainer} from './state/FormStateContainer'
import {PaginationContainer} from './state/PaginationContainer'
import {ReferenceDataContainer} from './state/ReferenceDataContainer'
import {ShowIfContainer} from './state/ShowIfContainer'
import {ValidationContainer} from './state/ValidationContainer'
import {ValuesContainer} from './state/ValuesContainer'

export interface FormProps {
    formDef: FormDef
}

export const Form: React.FC<FormProps> = (props) => (<div className="p-2 container">
    <ConfigContainer.Provider initialState={props.formDef.config}>
        <ReferenceDataContainer.Provider initialState={props.formDef.referenceData}>
            <FormStateContainer.Provider>
                <FieldStateContainer.Provider>
                    <ValuesContainer.Provider>
                        <ExpressionContainer.Provider>
                            <ShowIfContainer.Provider>
                                <ValidationContainer.Provider>
                                    <PaginationContainer.Provider>
                                        <ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
                                    </PaginationContainer.Provider>
                                </ValidationContainer.Provider>
                            </ShowIfContainer.Provider>
                        </ExpressionContainer.Provider>
                    </ValuesContainer.Provider>
                </FieldStateContainer.Provider>
            </FormStateContainer.Provider>
        </ReferenceDataContainer.Provider>
    </ConfigContainer.Provider>
</div>)