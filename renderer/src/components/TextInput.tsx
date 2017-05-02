import * as React from 'react'
import {FormElementProps} from './FormElement'

export interface TextInputTextInputProps {
	label: string
	description: string
}

export interface TextInputProps extends FormElementProps<TextInputTextInputProps> {
}

export class TextInput extends React.Component<TextInputProps, any> {
	render() {
		return <div className="form-group">
			<label htmlFor={this.props.definition.fieldId}>{this.props.definition.attributes.label}</label>
			<input type="text" className="form-control" id={this.props.definition.fieldId} aria-describedby={this.props.definition.fieldId + '_description'}/>
			{!!this.props.definition.attributes.description &&
			<small id={this.props.definition.fieldId + '_description'} className="form-text text-muted">{this.props.definition.attributes.description}</small>
			}
		</div>
	}
}