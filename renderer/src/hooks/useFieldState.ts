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

	const getFieldState = (path: string): FieldState => get(`${FIELD_STATE_STORE_KEY}.${path}`, {eventTimes: {}})

	const eventHappened = (path: string, event: Events) => {
		if (!getFieldState(path).eventTimes[event]) {
			set(`${FIELD_STATE_STORE_KEY}.${path}.eventTimes.${event}`, Date.now())
		}
	}

	return {
		getFieldState: (path: string): FieldState => get(`${FIELD_STATE_STORE_KEY}.${path}`, {eventTimes: {}}),

		setSelectedSuggestionLabel: (path: string, label: string) => {
			set(FIELD_STATE_STORE_KEY + '.' + path + '.selectedSuggestionLabel', label)
		},

		focus: (path: string) => eventHappened(path, 'focus'),
		valueChanged: (path: string) => eventHappened(path, 'valueChanged'),
		blur: (path: string) => eventHappened(path, 'blur'),
	}
}