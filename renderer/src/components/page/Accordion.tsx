import * as React from 'react'
import { Element, scroller } from 'react-scroll'

import { FormElementProps, FormElementDef } from '../FormElement'
import { Page } from './Page'
import { createKey } from '../../util'

export interface AccordionAttributes {
}

export interface AccordionProps extends FormElementProps<AccordionAttributes> {
}

interface AccordionState {
    currentPage: number
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {

    constructor(props: AccordionProps) {
        super(props)
        this.state = {
            currentPage: 0
        }
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
        this.goToNextPage = this.goToNextPage.bind(this)
    }

    componentDidUpdate() {
        scroller.scrollTo('page_' + this.state.currentPage, {offset: -100})
    }

    setCurrentPage(index: number) {
        this.setState(() => {
            return {currentPage: index}
        })
    }

    goToPage(index: number) {
        if (index < this.state.currentPage) {
            this.setCurrentPage(index)
        }
    }

    goToPreviousPage() {
        this.setCurrentPage(this.state.currentPage - 1)
    }

    goToNextPage() {
        this.setCurrentPage(this.state.currentPage + 1)
    }

    submit() {
        // this.formState.submit()
    }

    // tslint:disable-next-line
    page(page: FormElementDef<any>, index: number) {
        if (this.state.currentPage === index) {
            return (
                <Page
                    definition={page}
                    goToPreviousPage={this.goToPreviousPage}
                    goToNextPage={this.goToNextPage}
                    parentFieldPath=""
                    fieldPath=""
                    showPrevious={index > 0}
                    isLast={index === (this.props.definition.children!.length - 1)}
                    submit={this.submit}
                />)
        }
        return null
    }

    render() {
        return (
            <div className="accordion" role="tablist" aria-multiselectable="true">
                {this.props.definition.children!.map((page, index) => {
                    return <div className="card" key={createKey()}>
                        <div className="card-header cursor-pointer" onClick={() => this.goToPage(index)}>
                            <Element name={'page_' + index}>
                                <h4 className="d-inline">{page.attributes.label}</h4>{index < this.state.currentPage && <a className="d-inline text-muted"> <u>edit</u></a>}
                            </Element>
                        </div>
                        {this.page(page, index)}
                    </div>
                })}
            </div>)
    }
}