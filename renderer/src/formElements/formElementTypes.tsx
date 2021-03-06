import React from 'react'
import {List} from './collection/List'
import {Autocomplete} from './input/Autocomplete'
import {ButtonGroup} from './input/ButtonGroup'
import {Dropdown} from './input/Dropdown'
import {TextInput} from './input/TextInput'
import {Heading} from './output/Heading'
import {Paragraph} from './output/Paragraph'
import {TextOutput} from './output/TextOutput'
import {Accordion} from './pagination/Accordion'
import {Tabs} from './pagination/Tabs'

interface FormElementTypesMap {
	[type: string]: React.ReactNode
}

export const formElementNonCollectionTypes: FormElementTypesMap = {
	'accordion': Accordion,
	'dropdown': Dropdown,
	'textInput': TextInput,
	'heading': Heading,
	'paragraph': Paragraph,
	'buttonGroup': ButtonGroup,
	'tabs': Tabs,
	'autocomplete': Autocomplete,
	'textOutput': TextOutput
}

export const formElementCollectionTypes: FormElementTypesMap = {
	'list': List
}

export const formElementTypes: FormElementTypesMap = {...formElementNonCollectionTypes, ...formElementCollectionTypes}

export function lookupElement(type: string): React.ReactNode {
	const foundType = formElementTypes[type]
	if (!foundType) {
		console.warn('Could not find form element type:' + type)
		return () => <div>Could not find form element type <code>{type}</code>.</div>
	}
	return foundType
}

export function isTypeACollection(type: string): boolean {
	return formElementCollectionTypes.hasOwnProperty(type)
}