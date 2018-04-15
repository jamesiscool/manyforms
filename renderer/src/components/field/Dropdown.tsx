import * as React from 'react'
import { setData, setState } from '../../state/actions'
import { getData, getState, validate } from '../../state/selectors'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options: string[]
}

export interface Props extends FormElementProps<DropdownAttributes> {
}

const Dropdown = (props: Props) => (
    <FieldChrome
        fieldPath={props.fieldPath}
        label={props.definition.attributes.label}
        description={props.definition.attributes.description}
        info={props.definition.attributes.info}
        error={getState(props.fieldPath).touched ? validate(props.fieldPath, props.definition) : undefined}
    >
        <select
            className="form-control custom-select"
            id={props.definition.fieldId}
            aria-describedby={props.definition.fieldId + '_description'}
            value={getData(props.fieldPath)}
            onChange={event => setData(props.fieldPath, event.currentTarget.value)}
            onBlur={() => setState(props.fieldPath, 'touched', true)}
        >
            <option value="" disabled={true}/>
            {props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    </FieldChrome>
)
export default Dropdown