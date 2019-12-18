//import 'react-app-polyfill/ie11'
import {FormDef} from '@manyforms/common'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from './Form'
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