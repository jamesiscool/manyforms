import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const get = require('lodash/get')
const set = require('lodash/set')

const actionCreator = actionCreatorFactory()

// Actions
// SET_DATA
export interface SetDataPayload {
    path: string,
    data: string
}

export const setData = actionCreator<SetDataPayload>('SET_DATA')

// ADD_TO_COLLECTION
export interface AddToCollectionPayload {
    path: string
}

export const addToCollection = actionCreator<AddToCollectionPayload>('ADD_TO_COLLECTION')

// DELETE_FROM_COLLECTION
export interface DeleteFromCollectionPayload {
    path: string,
    index: number
}

export const deleteFromCollection = actionCreator<DeleteFromCollectionPayload>('DELETE_FROM_COLLECTION')

// State
export interface State {
    formData: FormData
}

interface FormData {
    [fieldId: string]: string | FormData | [FormData]
}

const INITIAL_STATE: State = {
    formData: {}
}

// Reducer
export const reducer = reducerWithInitialState(INITIAL_STATE)
    .case(setData, (state, payload) => {
            return {
                ...state,
                formData: set({...state.formData}, payload.path, payload.data)
            }
        }
    )
    .case(addToCollection, (state, payload) => {
            const oldCollection: [FormData] = get(state.formData, payload.path) || []
            const newCollection = [...oldCollection, {}]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )
    .case(deleteFromCollection, (state, payload) => {
            const oldCollection: [FormData] = get(state.formData, payload.path) || []
            const newCollection = [...oldCollection.slice(0, payload.index), ...oldCollection.slice(payload.index + 1)]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )

// Selectors
export function getData(state: State, path: string): string | void {
    const found = get(state.formData, path)
    if (typeof found === 'string') {
        return found
    }
    return
}

export function getCollectionSize(state: State, path: string): number | void {
    const found = get(state.formData, path)
    if (found instanceof Array) {
        return found.length
    }
    return
}