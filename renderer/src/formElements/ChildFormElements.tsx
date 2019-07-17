import React from 'react'
import {FormElementDef} from '../FormDef'
import {ShowIfContainer} from '../state/ShowIfContainer'
import {useContainer} from '../state/useContainer'
import {createPath} from '../util'
import {lookupElement} from './formElementTypes'

interface ChildFormElementsProps {
	childFormElements: FormElementDef<any>[]
	parentPath: string
}

export const ChildFormElements = (props: ChildFormElementsProps) => {
	const showIfContainer = useContainer(ShowIfContainer)
	return (
		<div>
			{props.childFormElements.map((elementDef, index) => {
				const path = createPath(props.parentPath, elementDef.fieldId)
				if (!showIfContainer.shouldShow(path, elementDef)) {
					return null
				}
				const Child: any = lookupElement(elementDef.type)
				return React.createElement(Child, {
					definition: elementDef,
					parentPath: props.parentPath,
					path: path,
					key: props.parentPath + '_' + index
				})
			})}
		</div>)
}