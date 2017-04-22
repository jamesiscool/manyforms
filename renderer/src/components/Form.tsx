import * as React from 'react'

export interface FormProps {
	formElements: Array<object>
}

export const Form = (props: FormProps) =>
	<div>
		{props.formElements.map((element) => <div>Hello</div>)}
	</div>