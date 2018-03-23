import * as React from 'react'
import * as ReactTooltip from 'react-tooltip'

interface LabelProps {
    text: string,
    htmlFor: string
    info?: string
}

export const Label = (props: LabelProps) => (
    <label htmlFor={props.htmlFor} className="mr-2 h6">{props.text + ' '}
        {props.info && <img className="info-icon" data-tip={props.info} src="/icons/info-circle.svg"/>}
        <ReactTooltip className="tool-tip" place="right" effect="solid"/>
    </label>)