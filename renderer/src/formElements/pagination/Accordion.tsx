import classNames from 'classnames'
import React, {useEffect, useRef} from 'react'
import {FormElementDef} from '../../FormDef'
import {usePagination} from '../../hooks/usePagination'
import {useShowIf} from '../../hooks/useShowIf'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

export const Accordion = (props: FormElementProps<void>) => {
	const {shouldShow} = useShowIf()
	const pagination = usePagination()
	const currentPageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		props.definition.children && pagination.setUp(props.path, props.definition.children)
	})

	if (!props.definition.children) {
		return null
	}


	const scrollCurrentPageIntoView = () => {
		if (currentPageRef && currentPageRef.current) {
			window.scroll({top: currentPageRef.current.getBoundingClientRect().top - 100})
		}
	}

	const goToPage = (index: number) => {
		pagination.setCurrentPageIndex(index)
		scrollCurrentPageIntoView()
	}

	const previous = () => {
		pagination.previousClicked()
		scrollCurrentPageIntoView()
	}

	const next = () => {
		pagination.nextClicked()
		scrollCurrentPageIntoView()
	}

	return (
		<div className="accordion" role="tablist" aria-multiselectable="true">
			{props.definition.children!.map((page, index) => shouldShow(props.path, page) && <div className="card" key={props.path + '_PAGE_' + index}>
					{pagination.currentPageIndex === index && <div ref={currentPageRef}/>}
					<div className="card-header cursor-pointer" onClick={() => goToPage(index)}>
						<h3 className="d-inline">{page.attributes.label}</h3>{index < pagination.currentPageIndex && <button className="link-button text-muted px-1" onClick={() => goToPage(index)}><u>edit</u></button>}
					</div>
					{pagination.currentPageIndex === index && <div className="card-body m-1">
						{page.children && <ChildFormElements childFormElements={page.children as FormElementDef<any>[]} parentPath={props.parentPath}/>}
						<div className="row">
							<div className="col">
								<nav aria-label="Page navigation">
									<ul className="pagination mb-0">
										{!pagination.currentIsFirst && <li className="page-item">
											<button className="page-link" onClick={previous}>Previous</button>
										</li>}
										{!pagination.currentIsLast && <li className={classNames('page-item', {disabled: pagination.disableNext})}>
											<button className="page-link" onClick={next} disabled={pagination.disableNext}>Next</button>
										</li>}
									</ul>
								</nav>
							</div>
							{pagination.currentIsLast && <div className="col">
								<button className="btn btn-primary float-right" onClick={pagination.submitClicked}>Submit</button>
							</div>}
						</div>
					</div>}
				</div>
			)}
		</div>
	)
}