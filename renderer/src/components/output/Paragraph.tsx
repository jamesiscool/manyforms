import * as React from 'react'
import { FormElementProps } from '../FormElement'

interface ParagraphAttributes {
    text: string
}

interface ParagraphProps extends FormElementProps<ParagraphAttributes> {
}

const Paragraph = (props: ParagraphProps) => (
    <p>{props.definition.attributes.text}</p>
)
export default Paragraph