import * as React from 'react'
import { FormElementProps } from '../FormElement'

interface HeadingAttributes {
    level: number
    text: string
}

export interface HeadingProps extends FormElementProps<HeadingAttributes> {
}

export class Heading extends React.Component<HeadingProps, undefined> {
    render() {
        const HeadingTag = 'h' + this.props.definition.attributes.level
        return (
            <HeadingTag>
                {this.props.definition.attributes.text}
            </HeadingTag>)
    }
}