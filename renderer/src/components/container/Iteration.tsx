import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { addToCollection, AddToCollectionPayload, deleteFromCollection, DeleteFromCollectionPayload } from '../../state/actions'
import { State } from '../../state/reducer'
import { getCollectionSize } from '../../state/selectors'
import { createKey, ordinal } from '../../util'
import { Children } from '../Children'
import { appendFieldId, FormElementProps } from '../FormElement'
import { Description } from '../output/Description'

const times = require('lodash/times')

interface IterationStateProps {
    size: number
}

interface IterationDispatchProps {
    addToCollection: (payload: AddToCollectionPayload) => void
    deleteFromCollection: (payload: DeleteFromCollectionPayload) => void
}

export interface IterationAttributes {
    label: string
    itemLabel: string
    description: string
}

export interface IterationOwnProps extends FormElementProps<IterationAttributes> {
}

type IterationProps = IterationStateProps & IterationDispatchProps & IterationOwnProps

export class Iteration extends React.Component<IterationProps> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    addItem() {
        this.props.addToCollection({path: this.fieldPath})
    }

    removeItem(index: number) {
        this.props.deleteFromCollection({path: this.fieldPath, index: index})
    }

    render() {
        const childrenDefinitions = this.props.definition.children ? this.props.definition.children : []
        return (
            <div className="form-group">
                <label className="h4 mr-2">{this.props.definition.attributes.label}</label>
                {this.props.definition.attributes.description && <Description fieldPath={this.fieldPath} text={this.props.definition.attributes.description}/>}
                {times(this.props.size, (index: number) => {
                    return (<div className="card mb-3" key={createKey()}>
                        <h5 className="card-header">{ordinal(index + 1)} {this.props.definition.attributes.itemLabel}
                            <button className="close text-dark" onClick={() => this.removeItem(index)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h5>
                        <div className="card-block m-4">
                            <Children children={childrenDefinitions} parentFieldPath={this.fieldPath + '[' + index + ']'}/>
                        </div>
                    </div>)
                })}
                <button className="btn btn-primary d-inline" onClick={() => this.addItem()}>Add</button>
            </div>)
    }
}

function mapStateToProps(state: State, ownProps: IterationOwnProps) {
    return {
        size: getCollectionSize(state, appendFieldId(ownProps.parentFieldPath, ownProps.definition.fieldId)) || 0
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        addToCollection: (payload: AddToCollectionPayload) => dispatch(addToCollection(payload)),
        deleteFromCollection: (payload: DeleteFromCollectionPayload) => dispatch(deleteFromCollection(payload)),
    }
}

export const ConnectedIteration = connect<IterationStateProps, IterationDispatchProps, IterationOwnProps>(mapStateToProps, mapDispatchToProps)(Iteration)
