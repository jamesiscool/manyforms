import produce from 'immer'
import {useState} from 'react'
import {createContainer} from './useContainer'

interface FieldStates {
	[path: string]: FieldState
}

interface FieldState {
	selectedLabel?: string,
	eventTimes: EventTimes
}

type EventTimes = {
	[Event in Events]: number; //Date.now() when event first happened on the field
}
type Events = 'focus' | 'valueChanged' | 'blur'

export const FieldStateContainer = createContainer(() => {
	const [fieldStates, setFieldStates] = useState<FieldStates>({})

	const get = (path: string): FieldState => fieldStates[path] || {eventTimes: {}}

	const selectedLabel = (path: string, label: string) => {
		const nextFieldStates = produce<FieldStates>(fieldStates, draftFieldStates => {
				const fieldState: FieldState = draftFieldStates[path] || {}
				fieldState.selectedLabel = label
				draftFieldStates[path] = fieldState
			}
		)
		setFieldStates(nextFieldStates)
	}

	const setEventNow = (path: string, event: Events) => {
		const nextFieldStates = produce<FieldStates>(fieldStates, draftFieldStates => {
				const draftFieldState = draftFieldStates[path] || {eventTimes: {}}
				if (!draftFieldState.eventTimes[event]) {
					draftFieldState.eventTimes[event] = Date.now()
				}
				draftFieldStates[path] = draftFieldState
			}
		)
		setFieldStates(nextFieldStates)
	}
	const focus = (path: string) => setEventNow(path, 'focus')
	const valueChanged = (path: string) => setEventNow(path, 'valueChanged')
	const blur = (path: string) => setEventNow(path, 'blur')

	return {get, selectedLabel, focus, valueChanged, blur}
})