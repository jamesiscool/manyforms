import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Form} from './components/Form'

const formElements = [
	{
		type: 'TextInput',
		attributes: {
			label: 'First Name'
		},
		children: [{}]
	}, {
		type: 'TextInput',
		attributes: {
			label: 'Last Name'
		},
		children: [{}]
	}
]

ReactDOM.render(
	<Form formElements={formElements}/>,
	document.getElementById('form')
)