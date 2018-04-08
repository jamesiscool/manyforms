import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export interface SetDataPayload {
    path: string,
    data: string
}

export const setData = actionCreator<SetDataPayload>('SET_DATA')

export interface AddToCollectionPayload {
    path: string
}

export const addToCollection = actionCreator<AddToCollectionPayload>('ADD_TO_COLLECTION')

export interface DeleteFromCollectionPayload {
    path: string,
    index: number
}

export const deleteFromCollection = actionCreator<DeleteFromCollectionPayload>('DELETE_FROM_COLLECTION')

export interface SetStatePayload {
    path: string
    name: string
    value: string | number | boolean
}

export const setState = actionCreator<SetStatePayload>('SET_STATE')