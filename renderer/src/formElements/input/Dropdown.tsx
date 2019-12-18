import {FieldDef} from '@manyforms/common'
import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {useFieldState} from '../../hooks/useFieldState'
import {useReferenceData} from '../../hooks/useReferenceData'
import {useValues} from '../../hooks/useValues'
import {createKey} from '../../util'
import {FormElementProps} from '../FormElementProps'

export interface DropdownDef extends FieldDef {
	info?: string
	options?: string[]
	referenceDataOptions?: string
}

interface Option {
	value: string | number,
	label: string
}

type Data = string | number

export const Dropdown = (props: FormElementProps<DropdownDef>) => {
	const referenceData = useReferenceData().referenceData
	const {getValue, setValue} = useValues()
	const {blur, focus} = useFieldState()
	let options: Array<Option | Data> = props.def.options || []
	if (props.def.referenceDataOptions) {
		options = options.concat(referenceData[props.def.referenceDataOptions])
	}
	return <FieldChrome path={props.path} def={props.def}>
		<select
			className="form-control custom-select"
			id={props.def.fieldId}
			value={getValue(props.path) || ''}
			onChange={event => setValue(props.path, event.currentTarget.value)}
			aria-describedby={props.def.fieldId + '_description'}
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