import * as React from 'react'
import { Description } from '../output/Description'
import { Label } from '../output/Label'

export interface FieldChromeProps {
    fieldPath: string
    label: string
    description: string
    children: React.ReactNode
}

export const FieldChrome = (props: FieldChromeProps) => (
    <div className="form-group">
        <Label htmlFor={props.fieldPath} text={props.label}/>
        {props.children}
        <Description id={props.fieldPath + '_description'} text={props.description}/>
    </div>)