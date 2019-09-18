import React from 'react'
import {FieldDef} from '../../FormDef'
import {useExpression} from '../../hooks/useExpression'
import {FormElementProps} from '../FormElementProps'

interface TextOutputDef extends FieldDef {
	expression?: string
	value?: string
}

export const TextOutput = (props: FormElementProps<TextOutputDef>) => {
	const {evaluate} = useExpression()
	if (props.def.expression) {
		return <>{evaluate(props.def.expression, props.path, props.def)}</>
	}
	if (props.def.value) {
		return <>{props.def.value}</>
	}
	return null
}