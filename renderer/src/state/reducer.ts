import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addToCollection, deleteFromCollection, setData } from './actions'

const get = require('lodash/get')
const set = require('lodash/set')

export interface State {
    formData: FormData
}

interface FormData {
    [fieldId: string]: string | FormData | [FormData]
}

const INITIAL_STATE: State = {
    formData: {}
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
    .case(setData, (state, payload) => {
            return {
                ...state,
                formData: set({...state.formData}, payload.path, payload.data)
            }
        }
    )
    .case(addToCollection, (state, payload) => {
            const oldCollection = <[FormData]> get(state.formData, payload.path, [])
            const newCollection = [...oldCollection, {}]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )
    .case(deleteFromCollection, (state, payload) => {
            const oldCollection = <[FormData]> get(state.formData, payload.path) || []
            const newCollection = [...oldCollection.slice(0, payload.index), ...oldCollection.slice(payload.index + 1)]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )