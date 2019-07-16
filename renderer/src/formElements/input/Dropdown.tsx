import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {FieldStateContainer} from '../../state/FieldStateContainer'
import {ReferenceDataContainer} from '../../state/ReferenceDataContainer'
import {useContainer} from '../../state/useContainer'
import {ValuesContainer} from '../../state/ValuesContainer'
import {FormElementProps} from '../FormElementProps'

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options?: string[]
    referenceDataOptions?: string
}

interface Option {
    value: string | number,
    label: string
}

type Data = string | number

export const Dropdown = (props: FormElementProps<DropdownAttributes>) => {
    const referenceDataContainer = useContainer(ReferenceDataContainer)
    const formValuesContainer = useContainer(ValuesContainer)
    const fieldStateContainer = useContainer(FieldStateContainer)
    let options: Array<Option | Data> = props.definition.attributes.options || []
    if (props.definition.attributes.referenceDataOptions) {
        options = options.concat(referenceDataContainer.referenceData[props.definition.attributes.referenceDataOptions])
    }
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
            {options.map((option) => {
                const label = typeof option === 'object' ? option.label : option
                const value = typeof option === 'object' ? option.value : option
                return <option value={value} key={value}>{label}</option>
            })}
        </select>
    </FieldChrome>
}