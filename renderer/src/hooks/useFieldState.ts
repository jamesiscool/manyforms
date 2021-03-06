import {useEvent} from './useEvent'
import {useStore} from './useStore'

/*interface FieldStates {
	[path: string]: FieldState
}*/

interface FieldState extends EventTimes {
	selectedSuggestionLabel?: string
	showManualEntryForSuggestion?: boolean
}

type EventTimes = {
	[Event in FieldEvents]?: number; //Date.now() when event first happened on the field
}

export type FieldEvents = 'focus' | 'valueChanged' | 'blur'

const FIELD_STATE_STORE_KEY = 'fieldStates'

export const useFieldState = () => {
	const {set, get} = useStore()
	const {handleEvent} = useEvent()

	const getFieldState = (path: string): FieldState => get(`${FIELD_STATE_STORE_KEY}.${path}`, {})

	const eventHappened = (path: string, event: FieldEvents) => {
		handleEvent(event, path)
		if (!getFieldState(path)[event]) {
			set(`${FIELD_STATE_STORE_KEY}.${path}.${event}`, Date.now())
		}
	}

	return {
		getFieldState: (path: string): FieldState => get(`${FIELD_STATE_STORE_KEY}.${path}`, {}),

		setSelectedSuggestionLabel: (path: string, label: string) => {
			set(FIELD_STATE_STORE_KEY + '.' + path + '.selectedSuggestionLabel', label)
		},

		setShowManualEntryForSuggestion: (path: string, showen: boolean) => {
			set(FIELD_STATE_STORE_KEY + '.' + path + '.showManualEntryForSuggestion', showen)
		},

		focus: (path: string) => eventHappened(path, 'focus'),
		valueChanged: (path: string) => eventHappened(path, 'valueChanged'),
		blur: (path: string) => eventHappened(path, 'blur'),
	}
}