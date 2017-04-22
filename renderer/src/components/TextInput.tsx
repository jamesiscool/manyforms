import * as React from 'react'

export interface TextInputProps {
	lable: string
}

export const TextInput = (props: TextInputProps) =>
	<h1>{props.lable}</h1>