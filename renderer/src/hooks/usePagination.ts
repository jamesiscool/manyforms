import {findLastIndex} from 'lodash-es'
import {useState} from 'react'
import {FormElementDef} from '../FormDef'
import {useConfig} from './useConfig'
import {useFormState} from './useFormState'
import {useShowIf} from './useShowIf'
import {useValidation} from './useValidation'

export const usePagination = () => {
	const config = useConfig().config
	const {hasErrorsRecursively} = useValidation()
	const {nextClicked, clearNextClicked, submitClicked} = useFormState()
	const {shouldShow} = useShowIf()
	const [path, setPath] = useState<string>('')
	const [pages, setPages] = useState<FormElementDef[]>([])
	const [currentPageIndex, setCurrentPageIndex] = useState<number>(-1)

	const firstShownPage = pages.findIndex(page => shouldShow(path, page))
	const lastShownPage = findLastIndex(pages, page => shouldShow(path, page))

	const currentIsFirst = currentPageIndex === firstShownPage
	const currentIsLast = currentPageIndex === lastShownPage

	const currentPageHasErrors = () => hasErrorsRecursively(path, pages[currentPageIndex])
	const disableNext = config.disableNextWhenErrors && currentPageHasErrors()


	return {
		setUp: (path: string, setupPages: FormElementDef[]) => {
			setPath(path)
			setPages(setupPages)
			if (currentPageIndex < 0) {
				setCurrentPageIndex(setupPages.findIndex(page => shouldShow(path, page)))
			}
		},
		nextClicked: () => {
			if (currentPageHasErrors()) {
				nextClicked()
			} else {
				for (let i = currentPageIndex + 1; i < pages.length; i++) {
					const pageDef = pages[i]
					if (pageDef && shouldShow(path, pageDef)) {
						clearNextClicked()
						setCurrentPageIndex(i)
						break
					}
				}
			}
		},
		previousClicked: () => {
			for (let i = currentPageIndex - 1; i >= 0; i--) {
				const pageDef = pages[i]
				if (pageDef && shouldShow(path, pageDef)) {
					clearNextClicked()
					setCurrentPageIndex(i)
					break
				}
			}
		},
		submitClicked: () => {
			if (currentPageHasErrors()) {
				submitClicked()
			} else {
				console.log('Submit')
			}
		},
		currentPageIndex, setCurrentPageIndex, currentIsFirst, currentIsLast, currentPageHasErrors, disableNext
	}
}