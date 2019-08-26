import classNames from 'classnames'
import React, {useEffect, useRef} from 'react'
import {FormElementDef} from '../../FormDef'
import {usePagination} from '../../hooks/usePagination'
import {useShowIf} from '../../hooks/useShowIf'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

interface TabAttributes {
	pill?: boolean
}


export const Tabs = (props: FormElementProps<TabAttributes>) => {
	const {shouldShow} = useShowIf()
	const pagination = usePagination()
	const tabsRef = useRef<HTMLDivElement>(null)

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		props.definition.children && pagination.setUp(props.path, props.definition.children)
	}, [props.definition.children, props.path])
	/* eslint-enable react-hooks/exhaustive-deps */

	useEffect(() => {
		if (tabsRef && tabsRef.current && tabsRef.current.getBoundingClientRect().top < 0) {
			tabsRef.current.scrollIntoView()
		}
	}, [pagination.currentPageIndex])

	if (!props.definition.children) {
		return null
	}

	if (pagination.currentPageIndex < 0) {
		return null
	}

	return (
		<div className="card rounded-0">
			<div className="card-header" ref={tabsRef}>
				<ul className={'nav ' + (props.definition.attributes.pill ? 'nav-pills card-header-pills' : 'nav-tabs card-header-tabs')}>
					{props.definition.children!.map((page, index) => {
						if (!shouldShow(props.path, page)) {
							return null
						}
						const key = props.path + '_PAGE_' + index
						//The bootstrap btn-link doesn't style the same as a link with a href when used as nav-link
						/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */
						if (index < pagination.currentPageIndex) {
							return <li className="nav-item" key={key}>
								<a className="nav-link" href="javascript:void(0)" onClick={() => pagination.setCurrentPageIndex(index)}>{page.attributes.label}</a>
							</li>
						}
						/* eslint-enable no-script-url, jsx-a11y/anchor-is-valid */
						if (index === pagination.currentPageIndex) {
							return <li className="nav-item" key={key}>
								<button className="nav-link active">{page.attributes.label}</button>
							</li>
						}
						if (index > pagination.currentPageIndex) {
							return <li className="nav-item" key={key}>
								<button className="nav-link disabled" tabIndex={-1} aria-disabled="true">{page.attributes.label}</button>
							</li>
						}
						return null
					})}
				</ul>
			</div>
			<div className="card-body">
				<div className="container">
					<ChildFormElements childFormElements={props.definition.children[pagination.currentPageIndex].children as FormElementDef[]} parentPath={props.parentPath}/>
					<div className="row">
						<div className="col">
							<nav aria-label="Page navigation">
								<ul className="pagination mb-0">
									{!pagination.currentIsFirst && <li className="page-item">
										<button className="page-link" onClick={pagination.previousClicked}>Previous</button>
									</li>}
									{!pagination.currentIsLast && <li className={classNames('page-item', {disabled: pagination.disableNext})}>
										<button className="page-link" onClick={pagination.nextClicked} disabled={pagination.disableNext}>Next</button>
									</li>}
								</ul>
							</nav>
						</div>
						{pagination.currentIsLast && <div className="col">
							<button className="btn btn-primary float-right" onClick={pagination.submitClicked}>Submit</button>
						</div>}
					</div>
				</div>
			</div>
		</div>)
}