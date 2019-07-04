import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {FieldStateContainer} from '../../state/FieldStateContainer'
import {useContainer} from '../../state/useContainer'
import {ValuesContainer} from '../../state/ValuesContainer'
import {FormElementProps} from '../FormElementProps'

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options: string[]
}

export const Dropdown = (props: FormElementProps<DropdownAttributes>) => {
    const formValuesContainer = useContainer(ValuesContainer)
    const fieldStateContainer = useContainer(FieldStateContainer)
    return <FieldChrome path={props.path} def={props.definition}>
        <select
            className="form-control custom-select"
            id={props.definition.fieldId}
            value={formValuesContainer.getValue(props.path) || ''}
            onChange={event => formValuesContainer.setValue(props.path, event.currentTarget.value)}
            aria-describedby={props.definition.fieldId + '_description'}
            onFocus={() => fieldStateContainer.focus(props.path)}
            onBlur={() => fieldStateContainer.blur(props.path)}
        >
            <option value=""/>
            {props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    </FieldChrome>
}