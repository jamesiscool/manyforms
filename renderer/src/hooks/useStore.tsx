import produce from 'immer'
import {get, set, unset} from 'lodash-es'
import React, {createContext, useReducer} from 'react'

interface StoreState {
	[key: string]: any
}

interface Store {
	store: StoreState,
	set: (path: string, value: any) => void
	get: <T extends any>(path: string, defaultValue?: T) => T
	getArrayLength: (path: string) => number
	deleteFromCollection: (path: string, index: number) => void
}

export const StoreContext = createContext<Store | null>(null)

export const StoreProvider: React.FC<{ initialState?: StoreState }> = (props) => {
	const store = useCreateStore(props.initialState)
	return <StoreContext.Provider value={store}>
		{props.children}
	</StoreContext.Provider>
}


const useCreateStore = (initialState?: StoreState) => {
	const [store, dispatch] = useReducer((storeState: StoreState, action: { actionType: 'set' | 'deleteFromCollection' | 'unset', path: string, value?: any, index?: number }) => {
		const nextStoreState = produce(storeState, draftStoreState => {
			switch (action.actionType) {
				case 'set':
					set(draftStoreState, action.path, action.value)
					break
				case 'deleteFromCollection':
					const array = get(draftStoreState, action.path) as any[]
					array.splice(action.index!, 1)
					set(draftStoreState, action.path, array)
					break
				case 'unset':
					unset(draftStoreState, action.path)
					break
				default:
					throw new Error()
			}
		})
		console.log('store:', nextStoreState)
		return nextStoreState
	}, initialState || {})

	return {
		store,
		set: (path: string, value: any) => {
			console.log('set:', path, value)
			dispatch({actionType: 'set', path, value})

		},
		get: <T extends any>(path: string, defaultValue?: T): T => {
			return get(store, path, defaultValue)
		},
		getArrayLength: (path: string): number => {
			return get(store, path, []).length
		},
		deleteFromCollection: (path: string, index: number) => {
			dispatch({actionType: 'deleteFromCollection', path, index})
		}
	}
}

export const useStore = (): Store => {
	const store = React.useContext(StoreContext)
	if (store === null) {
		throw new Error('Component must be wrapped with <StoreProvider>')
	}
	return store
}

