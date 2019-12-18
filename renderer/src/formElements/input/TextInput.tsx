import {FieldDef} from '@manyforms/common'
import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {useFieldState} from '../../hooks/useFieldState'
import {useValues} from '../../hooks/useValues'
import {FormElementProps} from '../FormElementProps'

interface TextInputDef extends FieldDef {
}

export const TextInput = (props: FormElementProps<TextInputDef>) => {
	const {getValue, setValue} = useValues()
	const {blur, focus} = useFieldState()

	return (<FieldChrome path={props.path} def={props.def}>
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