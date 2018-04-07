import * as classNames from 'classnames'
import * as React from 'react'

interface LabelProps {
    text: string,
    htmlFor: string,
    error: boolean
}

export const Label = (props: LabelProps) => {
    const labelClasses = classNames('mr-2 h5', {
        'text-danger': props.error,
    })
    return <label htmlFor={props.htmlFor} className={labelClasses}>{props.text}</label>
}