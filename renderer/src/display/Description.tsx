import React from 'react'

interface DescriptionProps {
    path: string,
    text: string
}

export const Description = (props: DescriptionProps) => (
    <div id={props.path + '_description'} className="pt-2 text-muted description">{props.text}</div>
)