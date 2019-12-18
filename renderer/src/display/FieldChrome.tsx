import {FieldDef} from '@manyforms/common'
import React from 'react'
import {useValidation} from '../hooks/useValidation'
import {Description} from './Description'
import {Label} from './Label'


interface FieldChromeProps {
	path: string
	def: FieldDef
}

export const FieldChrome: React.FC<FieldChromeProps> = (props) => {
	const error = useValidation().validateAndShouldShow(props.path, props.def)

	return <div className="form-group pt-1">
		{props.def.label && <Label htmlFor={props.path} text={props.def.label} error={!!error}/>}
		{props.children}
		{error && <div className="error-message text-danger pt-2">{error}</div>}
		{props.def.description && <Description path={props.path} text={props.def.description}/>}
	</div>
}