//import 'react-app-polyfill/ie11'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from './Form'
import FormDef from './FormDef'
import {StoreProvider} from './hooks/useStore'

import './index.css'

axios.get<FormDef>('api/formDefinition/exampleFormDefinition.json')
	.then(function (response) {
		ReactDOM.render(
			<StoreProvider>
				<Form formDef={response.data}/>
			</StoreProvider>,
			document.getElementById('form')
		)
	})