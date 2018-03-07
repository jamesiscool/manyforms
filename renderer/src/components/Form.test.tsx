import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Form } from './Form'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Form formElements={[]}/>, div)
})
