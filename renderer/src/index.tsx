import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer, State } from './state/store'

import { Form } from './components/Form'
import { FormElementDef } from './components/FormElement'

import './index.css'

const formElements: Array<FormElementDef<{}>> = [
    {
        type: 'Heading',
        attributes: {
            level: 1,
            text: 'Personal Loan'
        },
    },
    {
        type: 'Accordion',
        attributes: {},
        children: [
            {
                type: 'Page',
                attributes: {
                    label: 'Your loan details',
                },
                children: [{
                    fieldId: 'howManyPeopleApplying',
                    type: 'ButtonGroup',
                    attributes: {
                        label: 'How many people applying?',
                        options: ['1', '2']
                    },
                },
                    {
                        fieldId: 'areYouAnExistingCustomer',
                        type: 'ButtonGroup',
                        attributes: {
                            label: 'Are you an existing customer?',
                            options: ['Yes', 'No']
                        },
                    },
                    {
                        fieldId: 'nabId',
                        type: 'TextInput',
                        attributes: {
                            label: 'What is your NAB ID? ',
                            description: 'This will help us identify you. It\'s an 8-10 digit number found on the back of your NAB card above the black strip. It’s also the number you use to login to internet banking.'
                        }
                    }]
            }, {
                type: 'Page',
                attributes: {
                    label: 'Tell us about yourself'
                },
                children: [{
                    fieldId: 'title',
                    type: 'Dropdown',
                    attributes: {
                        label: 'Title',
                        options: ['Mr', 'Ms', 'Mrs', 'Miss', 'Dr']
                    },
                },
                    {
                        fieldId: 'firstName',
                        type: 'TextInput',
                        attributes: {
                            label: 'First Name'
                        }
                    },
                    {
                        fieldId: 'lastName',
                        type: 'TextInput',
                        attributes: {
                            label: 'Last Name'
                        }
                    }]
            }, {
                type: 'Page',
                attributes: {
                    label: 'Tell us about what you own'
                },
                children: [{
                    fieldId: 'property',
                    type: 'Iteration',
                    attributes: {
                        label: 'Properties',
                        itemLabel: 'Property'
                    },
                    children: [{
                        fieldId: 'type',
                        type: 'Dropdown',
                        attributes: {
                            label: 'What type of property is this?',
                            options: ['Residential property', 'Investment property']
                        },
                    }, {
                        fieldId: 'estimatedValue',
                        type: 'TextInput',
                        attributes: {
                            label: 'What\'s the estimated value?'
                        }
                    }, {
                        fieldId: 'ownership',
                        type: 'Dropdown',
                        attributes: {
                            label: 'Is this property solely or jointly owned?',
                            options: ['Solely owned', 'Jointly owned']
                        },
                    }]
                }]
            }
        ]
    }
]

const store = createStore<State>(reducer)

ReactDOM.render(
    (
        <Provider store={store}>
            <Form formElements={formElements}/>
        </Provider>
    ),
    document.getElementById('form')
)
