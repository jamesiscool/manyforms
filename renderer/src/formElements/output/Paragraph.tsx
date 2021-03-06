import React from 'react'
import {FormElementProps} from '../FormElementProps'


interface ParagraphAttributes {
	text: string
}

export const Paragraph = (props: FormElementProps<ParagraphAttributes>) => <p>{props.def.text}</p>