import * as React from 'react'
import { addToCollection, deleteFromCollection } from '../../state/actions'
import { getCollectionSize } from '../../state/selectors'
import { createKey, ordinal } from '../../util'
import { Children } from '../Children'
import { FormElementProps } from '../FormElement'
import { Description } from '../output/Description'

const times = require('lodash/times')

interface IterationAttributes {
    label: string
    itemLabel: string
    description: string
}

interface Props extends FormElementProps<IterationAttributes> {
}

const Iteration = (props: Props) => {
    const childrenDefinitions = props.definition.children ? props.definition.children : []
    return (
        <div className="form-group">
            <label className="h4 mr-2">{props.definition.attributes.label}</label>
            {props.definition.attributes.description && <Description fieldPath={props.fieldPath} text={props.definition.attributes.description}/>}
            {times(getCollectionSize(props.fieldPath), (index: number) => {
                return (<div className="card mb-3" key={createKey()}>
                    <h5 className="card-header">{ordinal(index + 1)} {props.definition.attributes.itemLabel}
                        <button className="close text-dark" onClick={() => deleteFromCollection(props.fieldPath, index)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                    <div className="card-block m-4">
                        <Children children={childrenDefinitions} parentFieldPath={props.fieldPath + '[' + index + ']'}/>
                    </div>
                </div>)
            })}
            <button className="btn btn-secondary d-inline" onClick={() => addToCollection(props.fieldPath)}>Add</button>
        </div>)
}

export default Iteration
