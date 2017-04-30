import * as React from 'react'
import {FormElementProps} from './FormElement'

interface HeadingAttributes {
	level: number
	text: string
}

export interface HeadingProps extends FormElementProps<HeadingAttributes> {
}

export class Heading extends React.Component<HeadingProps, any> {
	render() {
		let HeadingWithLevel = 'h' + this.props.definition.attributes.level
		return <HeadingWithLevel>
			{this.props.definition.attributes.text}
		</HeadingWithLevel>
	}
}

