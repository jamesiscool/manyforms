import * as React from 'react'

const times = require('lodash/times')

import { FormElementProps, appendFieldId } from '../FormElement'
import { Description } from '../output/Description'
import { Children } from '../Children'
import { createKey, ordinal } from '../../util'
import { addToCollection, AddToCollectionPayload, deleteFromCollection, DeleteFromCollectionPayload, getCollectionSize, State } from '../../state/store'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

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
                <label className="h5 mr-2">{this.props.definition.attributes.label}</label>
                <Description fieldPath={this.fieldPath} text={this.props.definition.attributes.description}/>
                {times(this.props.size, (index: number) => {
                    return (<div className="card mb-3" key={createKey()}>
                        <h6 className="card-header">{ordinal(index + 1)} {this.props.definition.attributes.itemLabel}
                            <button className="close text-dark" onClick={() => this.removeItem(index)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h6>
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
