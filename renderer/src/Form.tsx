import React, {useLayoutEffect} from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {useConfig} from './hooks/useConfig'
import {useFormDef} from './hooks/useFormDef'
import {useFormState} from './hooks/useFormState'
import {useReferenceData} from './hooks/useReferenceData'

export interface FormProps {
	formDef: FormDef
}

export const Form: React.FC<FormProps> = (props) => {
	const {setupFormDef} = useFormDef()
	const {setupConfig} = useConfig()
	const {setupReferenceData} = useReferenceData()

	/* eslint-disable react-hooks/exhaustive-deps */
	useLayoutEffect(() => {
		setupFormDef(props.formDef)
		setupConfig(props.formDef.config)
		setupReferenceData(props.formDef.referenceData)
	}, [])
	/* eslint-enable react-hooks/exhaustive-deps */

	const outcomeIndex = useFormState().formState.outcomeIndex
	if (outcomeIndex != null) {
		return <div className="outcome container">
			<ChildFormElements childFormElements={props.formDef.submit.outcomes[outcomeIndex].elements} parentPath=""/>
		</div>
	}

	return <div className="form">
		<ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
	</div>
}