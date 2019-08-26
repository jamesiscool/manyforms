import {times} from 'lodash-es'
import React from 'react'
import {Description} from '../../display/Description'
import {useValues} from '../../hooks/useValues'
import {ordinal} from '../../util'
import {ChildFormElements} from '../ChildFormElements'
import {FormElementProps} from '../FormElementProps'


export interface IterationAttributes {
	label: string
	itemLabel: string
	description: string
}

export const List = (props: FormElementProps<IterationAttributes>) => {
	const {getCollectionSize, addToCollection, deleteFromCollection} = useValues()
	return (
		<div className="form-group">
			<span className="h5 align-middle mr-2">{props.definition.attributes.label}</span>
			{props.definition.attributes.description && <Description path={props.path} text={props.definition.attributes.description}/>}
			{times(getCollectionSize(props.path), (index: number) =>
				<div className={'card border-bottom mb-3' + (index === 0 ? ' mt-2' : '')} key={props.path + '_COLLECTION_' + index}>
					<h6 className="card-header">{ordinal(index + 1)} {props.definition.attributes.itemLabel}
						<button className="close text-dark" onClick={() => deleteFromCollection(props.path, index)} aria-label="close">
							<span aria-hidden="true">&times;</span>
						</button>
					</h6>
					<div className="card-body pb-0">
						{props.definition.children && <ChildFormElements childFormElements={props.definition.children} parentPath={props.path + '[' + index + ']'}/>}
					</div>
				</div>
			)}
			<button className="btn btn-primary d-inline" onClick={() => addToCollection(props.path)}>Add</button>
		</div>)
}
