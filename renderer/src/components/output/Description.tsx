import * as React from 'react'

export const Description = (props: { id: string, text: string }) => {
    if (props.text !== undefined) {
        return <small id={props.id} className="form-text text-muted">{props.text}</small>
    } else {
        return <span/>
    }
}