import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {useFieldState} from '../../hooks/useFieldState'
import {useReferenceData} from '../../hooks/useReferenceData'
import {useValues} from '../../hooks/useValues'
import {createKey} from '../../util'
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
	const referenceData = useReferenceData().referenceData
	const {getValue, setValue} = useValues()
	const {blur, focus} = useFieldState()
	let options: Array<Option | Data> = props.definition.attributes.options || []
	if (props.definition.attributes.referenceDataOptions) {
		options = options.concat(referenceData[props.definition.attributes.referenceDataOptions])
	}
	return <FieldChrome path={props.path} def={props.definition}>
		<select
			className="form-control custom-select"
			id={props.definition.fieldId}
			value={getValue(props.path) || ''}
			onChange={event => setValue(props.path, event.currentTarget.value)}
			aria-describedby={props.definition.fieldId + '_description'}
			onFocus={() => focus(props.path)}
			onBlur={() => blur(props.path)}
		>
			<option value=""/>
			{options.map((option) => {
				const label = typeof option === 'object' ? option.label : option
				const value = typeof option === 'object' ? option.value : option
				return <option value={value} key={value || createKey()}>{label}</option>
			})}
		</select>
	</FieldChrome>
}