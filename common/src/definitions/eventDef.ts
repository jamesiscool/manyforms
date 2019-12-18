export interface EventDef {
	triggers: Trigger[]
	actions: ActionDef[]
}

export type EventType = 'formLoaded' | 'beforePageNext' | 'showManualEntryForSuggestion' | FieldEvents
export type FieldEvents = 'focus' | 'valueChanged' | 'blur'

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