import createStore from 'pure-store'

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

const initialState: State = {
    formData: {},
    formState: {}
}
export const store = createStore<State>(initialState)
export default store