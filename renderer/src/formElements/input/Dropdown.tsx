import React from "react"
import {useContainer} from "unstated-next"
import {FieldChrome} from "../../display/FieldChrome"
import {ValuesContainer} from "../../state/ValuesContainer"
import {FormElementProps} from "../FormElementProps"

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options: string[]
}

export const Dropdown = (props: FormElementProps<DropdownAttributes>) => {
    const formValuesContainer = useContainer(ValuesContainer)
    return <FieldChrome fieldPath={props.fieldPath} def={props.definition}>
        <select
            className="form-control custom-select"
            id={props.definition.fieldId}
            value={formValuesContainer.getValue(props.fieldPath) || ''}
            onChange={event => formValuesContainer.setValue(props.fieldPath, event.currentTarget.value)}
            aria-describedby={props.definition.fieldId + '_description'}
            //onBlur={() => props.setState({path: props.fieldPath, name: 'touched', value: true})}
        >
            <option value="" disabled={props.definition.validation && props.definition.validation.required}/>
            {props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    </FieldChrome>
}