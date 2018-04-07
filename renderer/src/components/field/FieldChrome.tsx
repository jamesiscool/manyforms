import * as React from 'react'
import { Description } from '../output/Description'
import { Label } from '../output/Label'

interface FieldChromeProps {
    fieldPath: string
    label: string
    description?: string
    info?: string
    error?: string
    children: React.ReactNode
}

export const FieldChrome = (props: FieldChromeProps) => (
    <div className="form-group py-2">
        {props.label && <Label htmlFor={props.fieldPath} text={props.label} error={!!props.error}/>}
        {props.children}
        {props.description && <Description fieldPath={props.fieldPath} text={props.description}/>}
        {props.error && <div className="text-danger pt-2">{props.error}</div>}
    </div>)