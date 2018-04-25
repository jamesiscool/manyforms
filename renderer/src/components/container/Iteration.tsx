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

interface StateProps {
    size: number
}

interface DispatchProps {
    addToCollection: (payload: AddToCollectionPayload) => void
    deleteFromCollection: (payload: DeleteFromCollectionPayload) => void
}

export interface IterationAttributes {
    label: string
    itemLabel: string
    description: string
}

export interface OwnProps extends FormElementProps<IterationAttributes> {
}

type Props = StateProps & DispatchProps & OwnProps

const Iteration = (props: Props) => (
    <div className="form-group">
        <span className="h4 align-middle mr-2">{props.definition.attributes.label}</span>
        {props.definition.attributes.description && <Description fieldPath={props.fieldPath} text={props.definition.attributes.description}/>}
        {times(props.size, (index: number) => {
            return (
                <div className="card border-bottom first-card mb-3" key={createKey()}>
                    <h5 className="card-header">{ordinal(index + 1)} {props.definition.attributes.itemLabel}
                        <button className="close text-dark" onClick={() => props.deleteFromCollection({path: props.fieldPath, index: index})}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                    <div className="card-body m-4">
                        <Children children={props.definition.children ? props.definition.children : []} parentFieldPath={props.fieldPath + '[' + index + ']'}/>
                    </div>
                </div>)
        })}
        <button className="btn btn-secondary d-inline" onClick={() => props.addToCollection({path: props.fieldPath})}>Add</button>
    </div>)

function mapStateToProps(state: State, ownProps: OwnProps) {
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

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Iteration)
