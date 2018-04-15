import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Form } from './components/Form'
import { FormElementDef } from './components/FormElement'
import './index.css'
import './polyfills'
import store from './state/store'

const formElements: FormElementDef<{}>[] = require('./exampleFormDefinition.json').elements

class Store extends React.Component {

    componentDidMount() {
        store.subscribe(() => {
            console.log('store.state', store.state)
            this.forceUpdate()
        })
    }

    render() {
        return (
            this.props.children
        )
    }
}

ReactDOM.render(
    <Store>
        <Form formElements={formElements}/>
    </Store>,
    document.getElementById('form')
)