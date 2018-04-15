import * as React from 'react'
import { setData, setState } from '../../state/actions'
import { getData, getState, validate } from '../../state/selectors'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface TextInputAttributes {
    label: string
    description: string
    info?: string
}

interface Props extends FormElementProps<TextInputAttributes> {
}

const TextInput = (props: Props) => (
    <FieldChrome
        fieldPath={props.fieldPath}
        label={props.definition.attributes.label}
        description={props.definition.attributes.description}
        info={props.definition.attributes.info}
        error={getState(props.fieldPath).touched ? validate(props.fieldPath, props.definition) : undefined}
    >
        <input
            type="text"
            className="form-control"
            id={props.definition.fieldId}
            aria-describedby={props.fieldPath + '_description'}
            value={getData(props.fieldPath)}
            onChange={event => setData(props.fieldPath, event.currentTarget.value)}
            onBlur={() => setState(props.fieldPath, 'touched', true)}
        />
    </FieldChrome>
)
export default TextInput
