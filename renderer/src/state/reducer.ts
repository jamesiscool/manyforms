import produce from 'immer'
import get from 'lodash-es/get'
import set from 'lodash-es/set'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addToCollection, deleteFromCollection, setData, setState } from './actions'

export interface State {
    formData: FormData
    formState: FormState
}

interface FormData {
    [fieldId: string]: FormData | FormData[] | string
}

interface FormState {
    [fieldId: string]: FormState | FormState[] | FieldState
}

export interface FieldState {
    touched?: boolean
}

const INITIAL_STATE: State = {
    formData: {},
    formState: {}
}

export const reducer = reducerWithInitialState(INITIAL_STATE)
    .case(setData, (state, payload) =>
        produce(state, draftState =>
            set<State>(draftState.formData, payload.path, payload.data)))

    .case(addToCollection, (state, payload) => {
            const oldCollection = <FormData[]> get(state.formData, payload.path, [])
            const newCollection = [...oldCollection, {}]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )
    .case(deleteFromCollection, (state, payload) => {
            const oldCollection = <FormData[]> get(state.formData, payload.path) || []
            const newCollection = [...oldCollection.slice(0, payload.index), ...oldCollection.slice(payload.index + 1)]
            return {
                ...state,
                formData: set({...state.formData}, payload.path, newCollection)
            }
        }
    )
    .case(setState, (state, payload) => {
            return {
                ...state,
                formState: set({...state.formState}, payload.path + '.' + payload.name, payload.value)
            }
        }
    )