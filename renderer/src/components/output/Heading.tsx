import * as React from 'react'
import { FormElementProps } from '../FormElement'

interface HeadingAttributes {
    level: number
    text: string
}

export interface HeadingProps extends FormElementProps<HeadingAttributes> {
}

const Heading = (props: HeadingProps) => {
    const HeadingTag = 'h' + props.definition.attributes.level
    return (
        <HeadingTag>
            {props.definition.attributes.text}
        </HeadingTag>)
}
export default Heading
