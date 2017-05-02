import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Form} from './components/Form'
import {FormElementDef} from './components/FormElement'

const formElements: Array<FormElementDef<any>> = [
	{
		type: 'Heading',
		attributes: {
			level: 1,
			text: 'Form Heading'
		},
		children: []
	}, {
		type: 'Paragraph',
		attributes: {
			text: 'This is an introduction describing the form'
		},
		children: []
	}, {
		type: 'Heading',
		attributes: {
			level: 2,
			text: 'Personal Details'
		},
		children: []
	}, {
		fieldId: 'firstName',
		type: 'TextInput',
		attributes: {
			label: 'First Name'
		},
		children: []
	}, {
		fieldId: 'lastName',
		type: 'TextInput',
		attributes: {
			label: 'Last Name',
			description: 'Your surname or family name'
		},
		children: []
	}
]

ReactDOM.render(
	<Form formElements={formElements}/>,
	document.getElementById('form')
)