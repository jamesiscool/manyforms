import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { createKey } from '../../util'
import { FormElementProps } from '../FormElement'
import { Page } from './Page'

export interface AccordionAttributes {
}

export interface AccordionProps extends FormElementProps<AccordionAttributes> {
}

interface AccordionState {
    currentPage: number
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
    private currentPageRef: Page | null

    constructor(props: AccordionProps) {
        super(props)
        this.state = {
            currentPage: 0
        }
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
        this.goToNextPage = this.goToNextPage.bind(this)
    }

    componentDidUpdate() {
        if (this.currentPageRef) {
            const domNode = findDOMNode(this.currentPageRef) as Element
            const domRect = domNode.getBoundingClientRect()
            window.scroll({top: domRect.top - 100})
        }
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

    render() {
        return (
            <div className="accordion" role="tablist" aria-multiselectable="true">
                {this.props.definition.children!.map((page, index) => {
                    return <div className="card" key={createKey()}>
                        <div className="card-header cursor-pointer" onClick={() => this.goToPage(index)}>
                            <h3 className="d-inline">{page.attributes.label}</h3>{index < this.state.currentPage && <a className="d-inline text-muted"> <u>edit</u></a>}
                        </div>
                        {this.state.currentPage === index && <Page
                            ref={(ref) => this.currentPageRef = ref}
                            definition={page}
                            goToPreviousPage={this.goToPreviousPage}
                            goToNextPage={this.goToNextPage}
                            parentFieldPath=""
                            fieldPath=""
                            showPrevious={index > 0}
                            isLast={index === (this.props.definition.children!.length - 1)}
                            submit={this.submit}
                        />}
                    </div>
                })}
            </div>)
    }
}