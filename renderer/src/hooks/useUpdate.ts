import {useState} from 'react'

// Based on useUpdate, useTimeout & useTimeoutFn from https://github.com/streamich/react-use
export const useUpdate = () => {
	const [, setCount] = useState(0)
	const update = () => setCount(count => count + 1)

	const updateIn = (ms: number) => {
		setTimeout(() => {
			update()
		}, ms)
	}

	return {
		update,
		updateIn,
		updateAt: (when: number) => {
			updateIn(when - Date.now())
		}
	}
}