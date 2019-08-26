import React from 'react'
import {FieldAttributes, FormElementDef} from '../FormDef'
import {useValidation} from '../hooks/useValidation'
import {Description} from './Description'
import {Label} from './Label'


interface FieldChromeProps {
	path: string
	def: FormElementDef<FieldAttributes>
}

export const FieldChrome: React.FC<FieldChromeProps> = (props) => {
	const error = useValidation().validateAndShouldShow(props.path, props.def)

	return (<div className="form-group pt-1">
		{props.def.attributes.label && <Label htmlFor={props.path} text={props.def.attributes.label} error={!!error}/>}
		{props.children}
		{error && <div className="error-message text-danger pt-2">{error}</div>}
		{props.def.attributes.description && <Description path={props.path} text={props.def.attributes.description}/>}
	</div>)
}