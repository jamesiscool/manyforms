import axios from 'axios'
import produce from 'immer'
import {useEffect, useState} from 'react'
import {ReferenceDataDef} from '../FormDef'
import {createContainer} from './useContainer'

export const ReferenceDataContainer = createContainer((referenceDataDef: ReferenceDataDef = {}) => {
	const [referenceData, setReferenceData] = useState<{ [name: string]: any }>(referenceDataDef.inline || {})
	useEffect(() => {
		referenceDataDef.http!.forEach(httpReferenceDataDef => {
			axios(httpReferenceDataDef)
				.then(function (response) {
					set(httpReferenceDataDef.name, response.data)
				})
		})
	}, [referenceDataDef])

	const set = (name: string, data: any) => {
		setReferenceData(produce(referenceData, draftReferenceData => {
			draftReferenceData[name] = data
		}))
	}


	return {referenceData, set}
})