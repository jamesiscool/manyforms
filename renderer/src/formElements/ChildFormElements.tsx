import React from 'react'
import {ElementDef, FieldDef} from '../FormDef'
import {useShowIf} from '../hooks/useShowIf'
import {createPath} from '../util'
import {FormElementProps} from './FormElementProps'
import {lookupElement} from './formElementTypes'

export const ChildFormElements: React.FC<{ childFormElements: (FieldDef | ElementDef)[], parentPath: string }> = (props) =>
	<div>
		{props.childFormElements.map((elementDef, index) => {
			const path = createPath(props.parentPath, elementDef.fieldId)
			return <ChildFormElement path={path} parentPath={props.parentPath} elementDef={elementDef} key={path + '_' + index}/>
		})}
	</div>

const ChildFormElement: React.FC<{ path: string, parentPath: string, elementDef: ElementDef }> = (props) => {
	const {shouldShow} = useShowIf()
	if (!shouldShow(props.path, props.elementDef)) {
		return null
	}
	const Child: any = lookupElement(props.elementDef.type)
	const childProps: FormElementProps = {
		def: props.elementDef,
		parentPath: props.parentPath,
		path: props.path
	}
	return React.createElement(Child, childProps)
}