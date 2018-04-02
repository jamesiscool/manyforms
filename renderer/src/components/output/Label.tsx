import * as React from 'react'

interface LabelProps {
    text: string,
    htmlFor: string
}

export const Label = (props: LabelProps) => <label htmlFor={props.htmlFor} className="mr-2 h6">{props.text}</label>