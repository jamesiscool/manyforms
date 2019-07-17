import classNames from 'classnames'
import React, {useEffect, useRef} from 'react'
import {FormElementDef} from '../../FormDef'
import {PaginationContainer} from '../../state/PaginationContainer'
import {ShowIfContainer} from '../../state/ShowIfContainer'
import {useContainer} from '../../state/useContainer'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

export const Accordion = (props: FormElementProps<void>) => {
	const showIfContainer = useContainer(ShowIfContainer)
	const paginationContainer = useContainer(PaginationContainer)

	const currentPageRef = useRef<HTMLDivElement>(null)


	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		props.definition.children && paginationContainer.setUp(props.path, props.definition.children)
	}, [])
	/* eslint-enable react-hooks/exhaustive-deps */

	if (!props.definition.children) {
		return null
	}


	const scrollCurrentPageIntoView = () => {
		if (currentPageRef && currentPageRef.current) {
			window.scroll({top: currentPageRef.current.getBoundingClientRect().top - 100})
		}
	}

	const goToPage = (index: number) => {
		paginationContainer.setCurrentPageIndex(index)
		scrollCurrentPageIntoView()
	}

	const previous = () => {
		paginationContainer.previousClicked()
		scrollCurrentPageIntoView()
	}

	const next = () => {
		paginationContainer.nextClicked()
		scrollCurrentPageIntoView()
	}

	return (
		<div className="accordion" role="tablist" aria-multiselectable="true">
			{props.definition.children!.map((page, index) => showIfContainer.shouldShow(props.path, page) && <div className="card" key={props.path + '_PAGE_' + index}>
					{paginationContainer.currentPageIndex === index && <div ref={currentPageRef}/>}
					<div className="card-header cursor-pointer" onClick={() => goToPage(index)}>
						<h3 className="d-inline">{page.attributes.label}</h3>{index < paginationContainer.currentPageIndex && <button className="link-button text-muted px-1" onClick={() => goToPage(index)}><u>edit</u></button>}
					</div>
					{paginationContainer.currentPageIndex === index && <div className="card-body m-1">
						{page.children && <ChildFormElements childFormElements={page.children as FormElementDef<any>[]} parentPath={props.parentPath}/>}
						<div className="row">
							<div className="col">
								<nav aria-label="Page navigation">
									<ul className="pagination mb-0">
										{!paginationContainer.currentIsFirst && <li className="page-item">
											<button className="page-link" onClick={previous}>Previous</button>
										</li>}
										{!paginationContainer.currentIsLast && <li className={classNames('page-item', {disabled: paginationContainer.disableNext})}>
											<button className="page-link" onClick={next} disabled={paginationContainer.disableNext}>Next</button>
										</li>}
									</ul>
								</nav>
							</div>
							{paginationContainer.currentIsLast && <div className="col">
								<button className="btn btn-primary float-right" onClick={paginationContainer.submitClicked}>Submit</button>
							</div>}
						</div>
					</div>}
				</div>
			)}
		</div>
	)
}