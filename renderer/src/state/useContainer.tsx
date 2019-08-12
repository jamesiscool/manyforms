import React from 'react'

export interface ContainerProviderProps<State = any> {
	initialState?: State
	children: React.ReactNode
}

export interface Container<Value, State = any> {
	Provider: React.ComponentType<ContainerProviderProps<State>>
	useContainer: () => Value
}

export function createContainer<Value, State = any>(useHook: (initialState?: State) => Value): Container<Value, State> {
	let Context = React.createContext<Value | null>(null)

	function Provider(props: ContainerProviderProps<State>) {
		let value = useHook(props.initialState)
		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}

	function useContainer(): Value {
		let value = React.useContext(Context)
		if (value === null) {
			throw new Error('Component must be wrapped with <Container.Provider>')
		}
		return value
	}

	return {Provider, useContainer}
}

export function useContainer<Value, State = any>(container: Container<Value, State>): Value {
	return container.useContainer()
}