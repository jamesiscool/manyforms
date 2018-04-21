import * as React from 'react'
import { Children } from '../Children'
import { FormElementProps } from '../FormElement'

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

    render() {
        return (
            <div className="card-body m-4">
                <Children children={this.props.definition.children!} parentFieldPath={this.props.definition.fieldId!}/>
                <div className="row">
                    <div className="col">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination mb-0">
                                {this.props.showPrevious ? this.pageButton('Previous', this.props.goToPreviousPage) : null}
                                {this.props.isLast ? null : this.pageButton('Next', this.props.goToNextPage)}
                            </ul>
                        </nav>
                    </div>
                    {this.props.isLast &&
                    <div className="col">
                        <button className="btn btn-primary float-right" onClick={() => console.log('Submit')}>Submit</button>
                    </div>}
                </div>
            </div>)
    }
}