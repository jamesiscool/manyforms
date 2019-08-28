import React, {useEffect} from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {useConfig} from './hooks/useConfig'
import {useFormDef} from './hooks/useFormDef'
import {useReferenceData} from './hooks/useReferenceData'

export interface FormProps {
	formDef: FormDef
}

export const Form: React.FC<FormProps> = (props) => {
	const {setupFormDef} = useFormDef()
	const {setupConfig} = useConfig()
	const {setupReferenceData} = useReferenceData()


	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		setupFormDef(props.formDef)
		setupConfig(props.formDef.config)
		setupReferenceData(props.formDef.referenceData)

	}, [props.formDef])

	return <div className="">
		<ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
	</div>
}