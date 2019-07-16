import classNames from 'classnames'
import React, {useEffect} from 'react'
import {FormElementDef} from '../../FormDef'
import {PaginationContainer} from '../../state/PaginationContainer'
import {ShowIfContainer} from '../../state/ShowIfContainer'
import {useContainer} from '../../state/useContainer'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'

interface TabAttributes {
    pill?: boolean
}


export const Tabs = (props: FormElementProps<TabAttributes>) => {
    const showIfContainer = useContainer(ShowIfContainer)
    const paginationContainer = useContainer(PaginationContainer)

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        props.definition.children && paginationContainer.setUp(props.path, props.definition.children)
    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */

    if (!props.definition.children) {
        return null
    }

    if (paginationContainer.currentPageIndex < 0) {
        return null
    }

    return (
        <div className="card rounded-0">
            <div className="card-header">
                <ul className={'nav ' + (props.definition.attributes.pill ? 'nav-pills card-header-pills' : 'nav-tabs card-header-tabs')}>
                    {props.definition.children!.map((page, index) => {
                        if (!showIfContainer.shouldShow(props.path, page)) {
                            return null
                        }
                        const key = props.path + '_PAGE_' + index
                        //The bootstrap btn-link doesn't style the same as a link with a href when used as nav-link
                        /* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */
                        if (index < paginationContainer.currentPageIndex) {
                            return <li className="nav-item" key={key}>
                                <a className="nav-link" href="javascript:void(0)" onClick={() => paginationContainer.setCurrentPageIndex(index)}>{page.attributes.label}</a>
                            </li>

                        }
                        /* eslint-enable no-script-url, jsx-a11y/anchor-is-valid */
                        if (index === paginationContainer.currentPageIndex) {
                            return <li className="nav-item" key={key}>
                                <button className="nav-link active">{page.attributes.label}</button>
                            </li>
                        }
                        if (index > paginationContainer.currentPageIndex) {
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
                    <ChildFormElements childFormElements={props.definition.children[paginationContainer.currentPageIndex].children as FormElementDef<any>[]} parentPath={props.parentPath}/>
                    <div className="row">
                        <div className="col">
                            <nav aria-label="Page navigation">
                                <ul className="pagination mb-0">
                                    {!paginationContainer.currentIsFirst && <li className="page-item">
                                        <button className="page-link" onClick={paginationContainer.previousClicked}>Previous</button>
                                    </li>}
                                    {!paginationContainer.currentIsLast && <li className={classNames('page-item', {disabled: paginationContainer.disableNext})}>
                                        <button className="page-link" onClick={paginationContainer.nextClicked} disabled={paginationContainer.disableNext}>Next</button>
                                    </li>}
                                </ul>
                            </nav>
                        </div>
                        {paginationContainer.currentIsLast && <div className="col">
                            <button className="btn btn-primary float-right" onClick={paginationContainer.submitClicked}>Submit</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>)
}