import * as React from 'react'

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
    renderPage(page: FormElementDef<any>, index: number) {
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
            <div id="accordion" style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem'}} role="tablist" aria-multiselectable="true">
                {this.props.definition.children!.map((page, index: number) => {
                    return <div className="card" style={{borderLeft: '0', borderRight: '0', borderBottom: '0', borderRadius: '0'}} key={createKey()}>
                        <a className="card-header h4" onClick={() => this.goToPage(index)}>{page.attributes.label}
                        </a>
                        {this.renderPage(page, index)}
                    </div>
                })}
            </div>)
    }
}