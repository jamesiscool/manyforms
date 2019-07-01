import React from 'react'
import {useContainer} from 'unstated-next'
import {FormElementDef} from '../formElements/FormElementDef'
import {ValidationContainer} from '../state/ValidationContainer'
import {Description} from './Description'
import {Label} from './Label'


interface FieldChromeProps {
    path: string
    def: FormElementDef<any>
}

export const FieldChrome: React.FC<FieldChromeProps> = (props) => {
    const validationContainer = useContainer(ValidationContainer)
    const error = validationContainer.validateAndShouldShow(props.path, props.def)

    return (<div className="form-group py-2">
        {props.def.attributes.label && <Label htmlFor={props.path} text={props.def.attributes.label} error={!!error}/>}
        {props.children}
        {error && <div className="error-message text-danger pt-2">{error}</div>}
        {props.def.attributes.description && <Description path={props.path} text={props.def.attributes.description}/>}
    </div>)
}