import * as classNames from 'classnames'
import * as React from 'react'

interface LabelProps {
    text: string,
    htmlFor: string,
    error: boolean
}

export const Label = (props: LabelProps) => (
    <label htmlFor={props.htmlFor} className={classNames('mr-2 h5', {'text-danger': props.error})}>{props.text}</label>
)