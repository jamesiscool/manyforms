import {createContainer} from './useContainer'


type showErrors = 'immediately' | 'onFocus' | 'onValueChanged' | 'onBlur' | 'nextOrSummit'

export interface Config {
    showErrors: showErrors
    showErrorsDelay: number //milliseconds
    disableNextWhenErrors: boolean
}

const defaultConfig: Config = {
    showErrors: 'onFocus',
    showErrorsDelay: 500,
    disableNextWhenErrors: false
}

export const ConfigContainer = createContainer((userConfig = {}) => {
    const config = {...defaultConfig, ...userConfig}
    return {config}
})