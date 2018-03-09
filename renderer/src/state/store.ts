import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { set } from 'lodash'

const actionCreator = actionCreatorFactory()

export interface SetDataPayload { path: string, data: string }
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
        return set({...state}, payload.path, payload.data)
    })