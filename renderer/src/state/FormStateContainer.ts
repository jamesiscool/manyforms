import produce from 'immer'
import {useState} from 'react'
import {createContainer} from './useContainer'

type FormState = {
    nextClicked?: number
    submitClicked?: number
    nextOrSubmitClicked?: number //Date.now() when field first got focused
}

export const FormStateContainer = createContainer(() => {
    const [formState, setFormState] = useState<FormState>({})

    const nextClicked = () => {
        const nextFormStates = produce(formState, draftFormState => {
                if (!draftFormState.nextClicked) {
                    draftFormState.nextClicked = Date.now()
                }
            }
        )
        setFormState(nextFormStates)
    }

    const clearNextClicked = () => {
        const nextFormStates = produce(formState, draftFormState => {
                draftFormState.nextClicked = undefined
            }
        )
        setFormState(nextFormStates)

    }

    const submitClicked = () => {
        const nextFormStates = produce(formState, draftFormState => {
                if (!draftFormState.submitClicked) {
                    draftFormState.submitClicked = Date.now()
                }
            }
        )
        setFormState(nextFormStates)
    }

    const nextOrSubmit = (): boolean => {
        return !!formState.nextClicked || !!formState.submitClicked
    }

    return {formState, nextClicked, clearNextClicked, submitClicked, nextOrSubmit}
})