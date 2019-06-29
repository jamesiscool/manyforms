import React from 'react'
import {FormElementProps} from '../FormElementProps'

interface HeadingAttributes {
    level: number
    text: string
}

export const Heading = (props: FormElementProps<HeadingAttributes>) =>
    React.createElement('h' + props.definition.attributes.level, null, props.definition.attributes.text)