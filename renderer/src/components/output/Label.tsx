import * as React from 'react'

export const Label = (props: { text: string, htmlFor: string }) =>
    <label htmlFor={props.htmlFor} className="mr-2 h6">{props.text}</label>