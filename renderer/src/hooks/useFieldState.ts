import {useStore} from './useStore'

interface FieldStates {
	[path: string]: FieldState
}

interface FieldState {
	selectedSuggestionLabel?: string,
	eventTimes: EventTimes
}

type EventTimes = {
	[Event in Events]?: number; //Date.now() when event first happened on the field
}

type Events = 'focus' | 'valueChanged' | 'blur'

const FIELD_STATE_STORE_KEY = 'fieldStates'

export const useFieldState = () => {
	const {set, get} = useStore()

	return {
		getFieldState: (path: string): FieldState => get(`${FIELD_STATE_STORE_KEY}.${path}`, {eventTimes: {}}),

		setSelectedSuggestionLabel: (path: string, label: string) => {
			set(FIELD_STATE_STORE_KEY + '.' + path + '.selectedSuggestionLabel', label)
		},

		focus: (path: string) => set(`${FIELD_STATE_STORE_KEY}.${path}.focus`, Date.now()),
		valueChanged: (path: string) => set(`${FIELD_STATE_STORE_KEY}.${path}.valueChanged`, Date.now()),
		blur: (path: string) => set(`${FIELD_STATE_STORE_KEY}.${path}.blur`, Date.now()),
	}
}