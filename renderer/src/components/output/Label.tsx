import * as React from 'react'

interface LabelProps {
    text: string,
    htmlFor: string
    info?: string
}

export const Label = (props: LabelProps) => (
    <label htmlFor={props.htmlFor} className="mr-2 h6">{props.text + ' '}
        {props.info && <img className="info-icon" src="/icons/info-circle.svg"/>}
    </label>)