import {createContainer} from 'unstated-next'

type showErrors = 'immediately' | 'afterFocus' | 'afterValueChanged' | 'afterBlur' | 'nextOrSummit'

export interface Config {
    showErrors: showErrors
    showErrorsDelay: number //milliseconds
    disableNextWhenErrors: boolean
}

const defaultConfig: Config = {
    showErrors: 'afterFocus',
    showErrorsDelay: 1000   ,
    disableNextWhenErrors: false
}

export const useConfig = (userConfig = {}) => {
    const config = Object.assign(defaultConfig, userConfig)
    return {config}
}

export const ConfigContainer = createContainer(useConfig)