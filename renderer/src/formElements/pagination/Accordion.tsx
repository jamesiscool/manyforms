import classNames from 'classnames'
import {findLastIndex} from 'lodash-es'
import React, {useRef, useState} from 'react'
import {FormElementDef} from '../../FormDef'
import {ConfigContainer} from '../../state/ConfigContainer'
import {FormStateContainer} from '../../state/FormStateContainer'
import {ShowIfContainer} from '../../state/ShowIfContainer'
import {useContainer} from '../../state/useContainer'
import {ValidationContainer} from '../../state/ValidationContainer'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

export const Accordion = (props: FormElementProps<void>) => {
    const configContainer = useContainer(ConfigContainer)
    const validationContainer = useContainer(ValidationContainer)
    const formStateContainer = useContainer(FormStateContainer)
    const showIfContainer = useContainer(ShowIfContainer)

    const currentPageRef = useRef<HTMLDivElement>(null)

    const firstShownPage = props.definition.children!.findIndex(page => showIfContainer.shouldShow(props.path, page))
    const lastShownPage = findLastIndex(props.definition.children, page => showIfContainer.shouldShow(props.path, page))

    const [currentPage, setCurrentPage] = useState<number>(firstShownPage)

    if (!props.definition.children) {
        return null
    }

    const isFirst = currentPage === firstShownPage
    const isLast = currentPage === lastShownPage

    const currentPageHasErrors = () => validationContainer.hasErrorsRecursively(props.path, props.definition.children![currentPage])
    const disableNext = configContainer.config.disableNextWhenErrors && currentPageHasErrors()

    const goToPage = (newIndex: number) => {
        setCurrentPage(newIndex)
        if (currentPageRef && currentPageRef.current) {
            window.scroll({top: currentPageRef.current.getBoundingClientRect().top - 100})
        }
    }

    const previous = () => {
        for (let i = currentPage - 1; i >= 0; i--) {
            const pageDef = props.definition.children && props.definition.children[i]
            if (pageDef && showIfContainer.shouldShow(props.path, pageDef)) {
                goToPage(i)
                formStateContainer.clearNextClicked()
                break
            }
        }
    }

    const next = () => {
        if (currentPageHasErrors()) {
            formStateContainer.nextClicked()
        } else {
            for (let i = currentPage + 1; i < props.definition.children!.length; i++) {
                const pageDef = props.definition.children && props.definition.children[i]
                if (pageDef && showIfContainer.shouldShow(props.path, pageDef)) {
                    goToPage(i)
                    formStateContainer.clearNextClicked()
                    break
                }
            }
        }
    }

    const submit = () => {
        if (currentPageHasErrors()) {
            formStateContainer.submitClicked()
        } else {
            console.log('Submit')
        }
    }

    return (
        <div className="accordion" role="tablist" aria-multiselectable="true">
            {props.definition.children!.map((page, index) => showIfContainer.shouldShow(props.path, page) && <div className="card" key={props.path + '_PAGE_' + index}>
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
                                            <button className="page-link" onClick={previous}>Previous</button>
                                        </li>}
                                        {!isLast && <li className={classNames('page-item', {disabled: disableNext})}>
                                            <button className="page-link" onClick={next} disabled={disableNext}>Next</button>
                                        </li>}
                                    </ul>
                                </nav>
                            </div>
                            {isLast && <div className="col">
                                <button className="btn btn-primary float-right" onClick={submit}>Submit</button>
                            </div>}
                        </div>
                    </div>}
                </div>
            )}
        </div>
    )
}