import produce from 'immer'
import {useState} from 'react'
import {createContainer} from './useContainer'

type Events = 'focus' | 'valueChanged' | 'blur'

type FieldState = {
    [Event in Events]: number //Date.now() when field first got focused
}

export const FieldStateContainer = createContainer(() => {
    const [fieldStates, setFieldStates] = useState<{ [path: string]: FieldState }>({})
    const get = (path: string) => fieldStates[path] || {}
    const setEventNow = (path: string, event: Events) => {
        const nextFieldStates = produce(fieldStates, draftFieldStates => {
                const fieldState = draftFieldStates[path] || {}
                if (!fieldState[event]) {
                    fieldState[event] = Date.now()
                }
                draftFieldStates[path] = fieldState
            }
        )
        setFieldStates(nextFieldStates)
    }
    const focus = (path: string) => setEventNow(path, 'focus')
    const valueChanged = (path: string) => setEventNow(path, 'valueChanged')
    const blur = (path: string) => setEventNow(path, 'blur')

    return {fieldStates, get, focus, valueChanged, blur}
})