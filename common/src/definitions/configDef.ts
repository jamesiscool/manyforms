type showErrors = 'immediately' | 'onFocus' | 'onValueChanged' | 'onBlur' | 'nextOrSummit'

export interface Config {
	showErrors: showErrors
	showErrorsDelay: number //milliseconds
	disableNextWhenErrors: boolean
}