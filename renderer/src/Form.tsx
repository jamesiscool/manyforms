import React, {useEffect} from 'react'
import FormDef from './FormDef'
import {ChildFormElements} from './formElements/ChildFormElements'
import {useConfig} from './hooks/useConfig'
import {useReferenceData} from './hooks/useReferenceData'

export interface FormProps {
	formDef: FormDef
}

export const Form: React.FC<FormProps> = (props) => {
	const config = useConfig()
	const referenceData = useReferenceData()

	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		config.setup(props.formDef.config)
		referenceData.setup(props.formDef.referenceData)
	}, [props.formDef.config, props.formDef.referenceData])

	return <div className="">
		<ChildFormElements childFormElements={props.formDef.elements} parentPath=""/>
	</div>
}