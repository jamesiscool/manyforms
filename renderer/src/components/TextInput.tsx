import * as React from 'react'
import {FormElementProps} from './FormElement'

export interface TextInputTextInputProps {
	label: string
}

export interface TextInputProps extends FormElementProps<TextInputTextInputProps> {

}

export class TextInput extends React.Component<TextInputProps, any> {
	render() {
		return <h1>TextInput {this.props.definition.type}</h1>
	}
}