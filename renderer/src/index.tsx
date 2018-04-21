import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Form } from './components/Form'
import { FormElementDef } from './components/FormElement'
import './css/bootstrap.css'
import './index.css'
import './polyfills'
import { reducer, State } from './state/reducer'

const store = createStore<State>(reducer)

interface FormDefinition {
    elements: FormElementDef<{}>[]
}

fetch('exampleFormDefinition.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then((formDef: FormDefinition) => {
        ReactDOM.render(
            (
                <Provider store={store}>
                    <Form formElements={formDef.elements}/>
                </Provider>
            ),
            document.getElementById('form')
        )
    })
