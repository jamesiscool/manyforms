import React from "react"
import ReactDOM from 'react-dom'
import {Form} from "./Form"
import FormDef from "./FormDef"
import './index.css'

fetch('exampleFormDefinition.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then((formDef: FormDef) => {
        ReactDOM.render(
            <Form formDef={formDef}/>,
            document.getElementById('form')
        )
    })