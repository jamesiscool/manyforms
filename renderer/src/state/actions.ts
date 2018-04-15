import { store } from './store'

const get = require('lodash/get')
const set = require('lodash/set')

export const setData = (path: string, data: string) => {
    store.update(state => set(state.formData, path, data))
}

export const addToCollection = (path: string) => {
    store.update(state => get(state.formData, path, []).push({}))
}

export const deleteFromCollection = (path: string, index: number) => {
    store.update(state => get(state.formData, path).splice(index, 1))
}

export const setState = (path: string, name: string, value: string | boolean) => {
    store.update(state => set(state.formState, path + '.' + name, value))
}