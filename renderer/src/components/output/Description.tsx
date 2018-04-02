import * as React from 'react'

export const Description = (props: { fieldPath: string, text: string }) => (
    <span id={props.fieldPath + '_description'} className="pt-2 text-muted small">{props.text}</span>
)