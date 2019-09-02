import {FieldDef} from '../FormDef'
import {useExpression} from './useExpression'
import {FieldEvents} from './useFieldState'
import {useFormDef} from './useFormDef'
import {useStore} from './useStore'
import {VALUES_STORE_KEY} from './useValues'

export interface EventDef {
	triggers: Trigger[]
	actions: ActionDef[]
}

type EventType = 'formLoaded' | 'beforePageNext' | 'showManualEntryForSuggestion' | FieldEvents

interface Trigger {
	eventType: EventType[]
	path?: string
	pathExpression?: string
}

type ActionType = 'setFieldValue' | 'setStoreValue'

interface ActionDef {
	action: ActionType,
	path?: string
	data?: any
	expression?: string
}

export const useEvent = () => {
	const {evaluate} = useExpression()
	const {set} = useStore()
	const {formDef} = useFormDef()


	const actions: { [action: string]: (actionDef: ActionDef, fieldDef?: FieldDef, expressionExtraContex?: any) => void } = {
		setFieldValue: ({path, expression, data}, fieldDef, expressionExtraContex) => {
			if (path == null) {
				return
			}
			if (data != null) {
				set(VALUES_STORE_KEY + '.' + path, data)
				return
			}
			if (expression) {
				set(VALUES_STORE_KEY + '.' + path, evaluate(expression, path, fieldDef, expressionExtraContex))
			}
		},
		setStoreValue: ({path, expression, data}, fieldDef, expressionExtraContex) => {
			if (path == null) {
				return
			}
			if (data != null) {
				set(path, data)
				return
			}
			if (expression) {
				set(path, evaluate(expression, path, fieldDef, expressionExtraContex))
			}
		}
	}

	return {
		handleEvent: (eventType: EventType, path?: string, fieldDef?: FieldDef, expressionExtraContex?: any) => {
			const eventDefs = (formDef && formDef.events) || []
			const eventsDefWithMatchingTriggers = eventDefs.filter(eventDef => eventDef.triggers.some(trigger => {
					const triggerEventMatches = trigger.eventType.includes(eventType)
					const triggerPathMatches = (trigger.path == null && trigger.pathExpression == null)
						|| trigger.path === path
						|| (trigger.pathExpression && evaluate(trigger.pathExpression, path, fieldDef, expressionExtraContex))
					return triggerEventMatches && triggerPathMatches
				})
			)
			eventsDefWithMatchingTriggers.forEach(eventDef => eventDef.actions.forEach(actionDef => {
				const action = actions[actionDef.action]
				if (action) {
					action(actionDef, fieldDef, expressionExtraContex)
				}
			}))

		}
	}
}