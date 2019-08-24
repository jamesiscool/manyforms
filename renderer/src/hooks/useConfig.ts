import {useStore} from './useStore'

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

const CONFIG_STORE_KEY = 'config'

export const useConfig = (formDefinitionConfig = {}) => {
	const {set, get} = useStore()
	return {
		config: get(CONFIG_STORE_KEY) || {},
		setup: (formDefinitionConfig = {}) => {
			set(CONFIG_STORE_KEY, {...defaultConfig, ...formDefinitionConfig})
		}
	}
}