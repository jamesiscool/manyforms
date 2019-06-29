import React from 'react'
import {useContainer} from 'unstated-next'
import {FieldChrome} from '../../display/FieldChrome'
import {ValuesContainer} from '../../state/ValuesContainer'
import {FormElementProps} from '../FormElementProps'

interface TextInputAttributes {
    label: string
    description: string
    info?: string
}

export const TextInput = (props: FormElementProps<TextInputAttributes>) => {
    const formValuesContainer = useContainer(ValuesContainer)
    return (<FieldChrome fieldPath={props.fieldPath} def={props.definition}>
        <input
            type="text"
            className="form-control"
            id={props.definition.fieldId}
            aria-describedby={props.fieldPath + '_description'}
            value={formValuesContainer.getValue(props.fieldPath) || ''}
            onChange={event => formValuesContainer.setValue(props.fieldPath, event.currentTarget.value)}
            //onBlur={() => props.setState({path: props.fieldPath, name: 'touched', value: true})}
        />
    </FieldChrome>)
}