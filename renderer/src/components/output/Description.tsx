import * as React from 'react'

interface Props {
    fieldPath: string,
    text: string
}

export const Description = (props: Props) => (
    <div id={props.fieldPath + '_description'} className="pt-2 text-muted small">{props.text}</div>
)