import {findLastIndex} from 'lodash-es'
import {useState} from 'react'
import {FormElementDef} from '../FormDef'
import {ConfigContainer} from './ConfigContainer'
import {FormStateContainer} from './FormStateContainer'
import {ShowIfContainer} from './ShowIfContainer'
import {createContainer, useContainer} from './useContainer'
import {ValidationContainer} from './ValidationContainer'

export const PaginationContainer = createContainer((initialState = {}) => {
	const configContainer = useContainer(ConfigContainer)
	const validationContainer = useContainer(ValidationContainer)
	const formStateContainer = useContainer(FormStateContainer)
	const showIfContainer = useContainer(ShowIfContainer)
	const [path, setPath] = useState<string>('')
	const [pages, setPages] = useState<FormElementDef<any>[]>([])
	const [currentPageIndex, setCurrentPageIndex] = useState<number>(-1)

	const setUp = (path: string, setupPages: FormElementDef<any>[]) => {
		setPath(path)
		setPages(setupPages)
		if (currentPageIndex < 0) {
			setCurrentPageIndex(setupPages.findIndex(page => showIfContainer.shouldShow(path, page)))
		}
	}

	const firstShownPage = pages.findIndex(page => showIfContainer.shouldShow(path, page))
	const lastShownPage = findLastIndex(pages, page => showIfContainer.shouldShow(path, page))

	const currentIsFirst = currentPageIndex === firstShownPage
	const currentIsLast = currentPageIndex === lastShownPage

	const currentPageHasErrors = () => validationContainer.hasErrorsRecursively(path, pages[currentPageIndex])
	const disableNext = configContainer.config.disableNextWhenErrors && currentPageHasErrors()

	const previousClicked = () => {
		for (let i = currentPageIndex - 1; i >= 0; i--) {
			const pageDef = pages[i]
			if (pageDef && showIfContainer.shouldShow(path, pageDef)) {
				formStateContainer.clearNextClicked()
				setCurrentPageIndex(i)
				break
			}
		}
	}

	const nextClicked = () => {
		if (currentPageHasErrors()) {
			formStateContainer.nextClicked()
		} else {
			for (let i = currentPageIndex + 1; i < pages.length; i++) {
				const pageDef = pages[i]
				if (pageDef && showIfContainer.shouldShow(path, pageDef)) {
					formStateContainer.clearNextClicked()
					setCurrentPageIndex(i)
					break
				}
			}
		}
	}

	const submitClicked = () => {
		if (currentPageHasErrors()) {
			formStateContainer.submitClicked()
		} else {
			console.log('Submit')
		}
	}


	return {setUp, currentPageIndex, setCurrentPageIndex, currentIsFirst, currentIsLast, currentPageHasErrors, disableNext, previousClicked, nextClicked, submitClicked}
})