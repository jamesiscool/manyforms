import * as React from 'react'
import * as ReactTooltip from 'react-tooltip'

interface LabelProps {
    text: string,
    htmlFor: string
    info?: string
}

export const Label = (props: LabelProps) => (
    <label htmlFor={props.htmlFor} className="mr-2 h6">{props.text + ' '}
        {props.info && <span className="info-icon" data-tip={props.info}/>}
        <ReactTooltip className="tool-tip" effect="solid"/>
    </label>)