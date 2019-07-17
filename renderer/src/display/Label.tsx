import React from 'react'

interface LabelProps {
	text: string,
	htmlFor: string,
	error: boolean
}

export const Label = (props: LabelProps) => <label htmlFor={props.htmlFor} className={'mr-2 h5 ' + (props.error ? 'text-danger' : '')}>{props.text}</label>