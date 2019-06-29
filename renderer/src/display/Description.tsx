import React from 'react'

interface DescriptionProps {
    fieldPath: string,
    text: string
}

export const Description = (props: DescriptionProps) => (
    <div id={props.fieldPath + '_description'} className="pt-2 text-muted description">{props.text}</div>
)