import {times} from "lodash"
import React from "react"
import {useContainer} from "unstated-next"
import {Description} from "../../display/Description"
import {ValuesContainer} from "../../state/ValuesContainer"
import {ordinal} from "../../util"
import {ChildFormElements} from "../ChildFormElements"
import {FormElementProps} from "../FormElementProps"


export interface IterationAttributes {
    label: string
    itemLabel: string
    description: string
}

export const List = (props: FormElementProps<IterationAttributes>) => {
    const formValuesContainer = useContainer(ValuesContainer)
    return (
        <div className="form-group">
            <span className="h4 align-middle mr-2">{props.definition.attributes.label}</span>
            {props.definition.attributes.description && <Description fieldPath={props.fieldPath} text={props.definition.attributes.description}/>}
            {times(formValuesContainer.getCollectionSize(props.fieldPath), (index: number) =>
                <div className={'card border-bottom mb-3' + (index === 0 ? ' mt-2' : '')} key={props.fieldPath + '_COLLECTION_' + index}>
                    <h5 className="card-header">{ordinal(index + 1)} {props.definition.attributes.itemLabel}
                        <button className="close text-dark" onClick={() => formValuesContainer.deleteFromCollection(props.fieldPath, index)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                    <div className="card-body pb-0">
                        {props.definition.children && <ChildFormElements childFormElements={props.definition.children} parentFieldPath={props.fieldPath + '[' + index + ']'}/>}
                    </div>
                </div>
            )}
            <button className="btn btn-secondary d-inline" onClick={() => formValuesContainer.addToCollection(props.fieldPath)}>Add</button>
        </div>)
}
