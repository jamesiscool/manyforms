import React from 'react'
import {FormElementDef} from '../FormDef'
import {useShowIf} from '../hooks/useShowIf'
import {createPath} from '../util'
import {lookupElement} from './formElementTypes'

export const ChildFormElements: React.FC<{ childFormElements: FormElementDef[], parentPath: string }> = (props) =>
	<div>
		{props.childFormElements.map((elementDef, index) => {
			const path = createPath(props.parentPath, elementDef.fieldId)
			return <ChildFormElement path={path} parentPath={props.parentPath} elementDef={elementDef} key={path + '_' + index}/>
		})}
	</div>

const ChildFormElement: React.FC<{ path: string, parentPath: string, elementDef: FormElementDef }> = (props) => {
	const {shouldShow} = useShowIf()
	if (!shouldShow(props.path, props.elementDef)) {
		return null
	}
	const Child: any = lookupElement(props.elementDef.type)
	return React.createElement(Child, {
		definition: props.elementDef,
		parentPath: props.parentPath,
		path: props.path
	})
}