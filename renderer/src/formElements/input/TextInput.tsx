import React from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {FieldStateContainer} from '../../state/FieldStateContainer'
import {useContainer} from '../../state/useContainer'
import {ValuesContainer} from '../../state/ValuesContainer'
import {FormElementProps} from '../FormElementProps'

interface TextInputAttributes {
	label: string
	description: string
	info?: string
}

export const TextInput = (props: FormElementProps<TextInputAttributes>) => {
	const formValuesContainer = useContainer(ValuesContainer)
	const fieldStateContainer = useContainer(FieldStateContainer)

	return (<FieldChrome path={props.path} def={props.definition}>
		<input
			type="text"
			className="form-control"
			id={props.path}
			aria-describedby={props.path + '_description'}
			value={formValuesContainer.getValue(props.path) || ''}
			onChange={event => formValuesContainer.setValue(props.path, event.currentTarget.value)}
			onFocus={() => fieldStateContainer.focus(props.path)}
			onBlur={() => fieldStateContainer.blur(props.path)}
		/>
	</FieldChrome>)
}