import classNames from 'classnames'
import React, {useRef, useState} from 'react'
import {useContainer} from 'unstated-next'
import {ValidationContainer} from '../../state/ValidationContainer'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementDef} from '../FormElementDef'
import {FormElementProps} from '../FormElementProps'

export interface AccordionAttributes {
}

export const Accordion = (props: FormElementProps<AccordionAttributes>) => {
    const currentPageRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const validationContainer = useContainer(ValidationContainer)

    if (!props.definition.children) {
        return null
    }

    const isFirst = currentPage === 0
    const isLast = currentPage === (props.definition.children!.length - 1)

    const currentPageHasErrors = validationContainer.hasErrorsRecursively(props.path, props.definition.children[currentPage])

    const goToPage = (newIndex: number) => {
        setCurrentPage(newIndex)
        if (currentPageRef && currentPageRef.current) {
            window.scroll({top: currentPageRef.current.getBoundingClientRect().top - 100})
        }
    }

    return (
        <div className="accordion" role="tablist" aria-multiselectable="true">
            {props.definition.children!.map((page, index) => (
                <div className="card" key={props.path + '_PAGE_' + index}>
                    {currentPage === index && <div ref={currentPageRef}/>}
                    <div className="card-header cursor-pointer" onClick={() => goToPage(index)}>
                        <h3 className="d-inline">{page.attributes.label}</h3>{index < currentPage && <button className="link-button text-muted px-1" onClick={() => goToPage(index)}><u>edit</u></button>}
                    </div>
                    {currentPage === index && <div className="card-body m-1">
                        {page.children && <ChildFormElements childFormElements={page.children as FormElementDef<any>[]} parentPath={props.parentPath}/>}
                        <div className="row">
                            <div className="col">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination mb-0">
                                        {!isFirst && <li className="page-item">
                                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                                        </li>}
                                        {!isLast && <li className={classNames('page-item', {disabled: currentPageHasErrors})}>
                                            <button className="page-link" onClick={() => goToPage(currentPage + 1)} disabled={currentPageHasErrors}>Next</button>
                                        </li>}
                                    </ul>
                                </nav>
                            </div>
                            {isLast &&
                            <div className="col">
                                <button className="btn btn-primary float-right" onClick={() => console.log('Submit')}>Submit</button>
                            </div>}
                        </div>
                    </div>}
                </div>
            ))}
        </div>
    )
}