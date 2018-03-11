import * as React from 'react'

import { FormElementProps, FormElementDef } from '../FormElement'
import { Page } from './Page'
import { createKey } from '../../util'

import './Accordion.css'

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

    goToPage(index: number) {
        if (index < this.state.currentPage) {
            this.setState(() => {
                return {currentPage: index}
            })
        }
    }

    goToPreviousPage() {
        this.setState((prevState) => {
            return {currentPage: prevState.currentPage - 1}
        })
    }

    goToNextPage() {
        this.setState((prevState) => {
            return {currentPage: prevState.currentPage + 1}
        })
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
                {this.props.definition.children!.map((page, index: number) => {
                    return <div className="card" key={createKey()}>
                        <div className="card-header cursor-pointer" onClick={() => this.goToPage(index)}>
                            <h4 className="d-inline">{page.attributes.label}</h4>{index < this.state.currentPage && <a className="d-inline text-muted"> <u>edit</u></a>}
                        </div>
                        {this.page(page, index)}
                    </div>
                })}
            </div>)
    }
}