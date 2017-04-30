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
		type: 'TextInput',
		attributes: {
			label: 'First Name'
		},
		children: []
	}
]

ReactDOM.render(
	<Form formElements={formElements}/>,
	document.getElementById('form')
)