import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import {Form} from './Form'
import FormDef from './FormDef'
import './index.css'

axios.get<FormDef>('exampleFormDefinition.json')
    .then(function (response) {
        ReactDOM.render(
            <Form formDef={response.data}/>,
            document.getElementById('form')
        )
    })
    .catch(function (error) {
        console.error(error)
        throw new Error(error)
    })