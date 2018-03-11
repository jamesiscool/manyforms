import * as React from 'react'

import { FormElementProps } from '../FormElement'
import { Children } from '../Children'

export interface PageAttributes {
    label: string
}

export interface PageProps extends FormElementProps<PageAttributes> {
    showPrevious: boolean
    isLast: boolean
    goToPreviousPage: () => void
    goToNextPage: () => void
    submit?: () => void
}

export class Page extends React.Component<PageProps, {}> {

    pageButton(label: string, onClick?: () => void) {
        return <li className="page-item"><a className="page-link text-primary" onClick={() => onClick!()}>{label}</a></li>
    }

    previousButton() {
        if (this.props.showPrevious) {
            return this.pageButton('Previous', this.props.goToPreviousPage)
        }
        return null
    }

    nextButton() {
        if (this.props.isLast) {
            return this.pageButton('Submit', this.props.submit)
        } else {
            return this.pageButton('Next', this.props.goToNextPage)
        }
    }

    render() {
        return (
            <div className="card-block m-3">
                <Children children={this.props.definition.children!} parentFieldPath={this.props.definition.fieldId!}/>
                <nav aria-label="Page navigation example">
                    <ul className="pagination mb-0">
                        {this.previousButton()}
                        {this.nextButton()}
                    </ul>
                </nav>
            </div>)
    }
}