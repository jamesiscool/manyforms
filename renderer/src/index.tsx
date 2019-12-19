//import 'react-app-polyfill/ie11'
import {GetFormDefResponse} from '@manyforms/common'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from './Form'
import {StoreProvider} from './hooks/useStore'

import './index.css'

axios.get<GetFormDefResponse>('http://localhost:3002/formDef/dev/1')
	.then(function (response) {
		ReactDOM.render(
			<StoreProvider>
				<Form formDef={response.data.formDef}/>
			</StoreProvider>,
			document.getElementById('form')
		)
	})