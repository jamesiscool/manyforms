import produce from 'immer'
import get from 'lodash-es/get'
import set from 'lodash-es/set'
import {useState} from 'react'
import {FieldStateContainer} from './FieldStateContainer'
import {createContainer, useContainer} from './useContainer'

export const ValuesContainer = createContainer((initialState = {}) => {
    const fieldStateContainer = useContainer(FieldStateContainer)
    const [formValues, setFormValues] = useState<{}>(initialState)

    const setValue = (path: string, value: any) => {
        const nextFormValues = produce(formValues, draftFormValues => {
            set(draftFormValues, path, value)
        })
        setFormValues(nextFormValues)
        fieldStateContainer.valueChanged(path)
        //console.log('formValues:', JSON.stringify(nextFormValues, null, 2))
    }

    function getValue(path: string): string {
        return get(formValues, path)
    }

    const addToCollection = (path: string) => {
        const nextFormValues = produce(formValues, draftFormValues => {
            const oldCollection = get(draftFormValues, path, [])
            const newCollection = [...oldCollection, {}]
            set(draftFormValues, path, newCollection)
        })
        setFormValues(nextFormValues)
    }
    const deleteFromCollection = (path: string, index: number) => {
        const nextFormValues = produce(formValues, draftFormValues => {
            const oldCollection = get(draftFormValues, path)
            const newCollection = [...oldCollection.slice(0, index), ...oldCollection.slice(index + 1)]
            set(draftFormValues, path, newCollection)
        })
        setFormValues(nextFormValues)
    }
    const getCollectionSize = (path: string) => {
        const collection = get(formValues, path)
        return collection ? collection.length : 0
    }
    return {formValues, setValue, getValue, addToCollection, deleteFromCollection, getCollectionSize}
})