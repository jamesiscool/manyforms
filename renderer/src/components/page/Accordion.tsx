import * as React from 'react'
import {observer, inject} from 'mobx-react'

import {FormElementProps, FormElementDef} from '../FormElement'
import {FormState} from '../../store/index'
import {createKey} from '../../util'
import {Page} from './Page'

export interface AccordionAttributes {
    hello: string
}

export interface AccordionProps extends FormElementProps<AccordionAttributes> {
    formState: FormState
}

interface AccordionState {
    currentPage: number
}

@inject('formState')
@observer
export class Accordion extends React.Component<AccordionProps, AccordionState> {
    formState = this.props.formState

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
            this.setState((prevState) => {
                return prevState.currentPage = index
            })
        }
    }

    goToPreviousPage() {
        this.setState((prevState) => {
            return prevState.currentPage--
        })
    }

    goToNextPage() {
        this.setState((prevState) => {
            return prevState.currentPage++
        })
    }

    submit() {
        this.formState.submit()
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
                    return <div className="card mp-1" style={{borderLeft: '0', borderRight: '0', borderBottom: '0', borderRadius: '0'}} key={createKey()}>
                        <a className="card-header h4" onClick={e => this.goToPage(index)}>{page.attributes.label}
                        </a>
                        {this.renderPage(page, index)}
                    </div>
                })}
            </div>)
    }
}