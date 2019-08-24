import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {useFieldState} from '../../hooks/useFieldState'
import {useValues} from '../../hooks/useValues'
import {FormElementProps} from '../FormElementProps'

interface TextInputAttributes {
	label: string
	description: string
	info?: string
}

export const TextInput = (props: FormElementProps<TextInputAttributes>) => {
	const {getValue, setValue} = useValues()
	const {blur, focus} = useFieldState()

	return (<FieldChrome path={props.path} def={props.definition}>
		<input
			type="text"
			className="form-control"
			id={props.path}
			aria-describedby={props.path + '_description'}
			value={getValue(props.path) || ''}
			onChange={event => setValue(props.path, event.currentTarget.value)}
			onFocus={() => focus(props.path)}
			onBlur={() => blur(props.path)}
		/>
	</FieldChrome>)
}