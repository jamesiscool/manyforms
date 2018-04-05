import { State } from './reducer'

const get = require('lodash/get')

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