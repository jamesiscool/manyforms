import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const get = require('lodash/get')
const set = require('lodash/set')

const actionCreator = actionCreatorFactory()

export interface SetDataPayload {
    path: string,
    data: string
}

export const setData = actionCreator<SetDataPayload>('SET_DATA')

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