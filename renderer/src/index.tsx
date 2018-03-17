import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer, State } from './state/store'

import { Form } from './components/Form'
import { FormElementDef } from './components/FormElement'

import './index.css'

const formElements: Array<FormElementDef<{}>> = require('./exampleFormDefinition.json').elements

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: () => State
    }
}

const store = createStore<State>(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    (
        <Provider store={store}>
            <Form formElements={formElements}/>
        </Provider>
    ),
    document.getElementById('form')
)
