import * as React from 'react'
import { FormElementProps } from '../FormElement'

export interface ParagraphAttributes {
    text: string
}

export interface ParagraphProps extends FormElementProps<ParagraphAttributes> {
}

export const Paragraph = (props: ParagraphProps) =>
    <p>{props.definition.attributes.text}</p>