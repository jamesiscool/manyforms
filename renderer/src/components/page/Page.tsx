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
    previousButton() {
        if (this.props.showPrevious) {
            return (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.goToPreviousPage()
                    }}
                >Previous
                </button>)
        }
        return null
    }

    nextButton() {
        if (this.props.isLast) {
            return (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.submit!()
                    }}
                >Submit
                </button>)
        } else {
            return (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this.props.goToNextPage()
                    }}
                >Next
                </button>)
        }
    }

    render() {
        return (
            <div className="card-block m-3">
                <Children children={this.props.definition.children!} parentFieldPath={this.props.definition.fieldId!}/>
                <div className="btn-group">
                    {this.previousButton()}
                    {this.nextButton()}
                </div>
            </div>)
    }
}