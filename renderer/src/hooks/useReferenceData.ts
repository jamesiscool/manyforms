import axios from 'axios'
import {ReferenceDataDef} from '../FormDef'
import {useStore} from './useStore'

interface ReferenceData {
	[name: string]: any
}

const REFERENCE_DATA_STORE_KEY = 'referenceData'

export const useReferenceData = () => {
	const {set, get} = useStore()

	return {
		referenceData: get<ReferenceData>(REFERENCE_DATA_STORE_KEY),
		setReferenceData: (name: string, data: any) => {
			set(`${REFERENCE_DATA_STORE_KEY}.name`, data)
		},
		setupReferenceData: (referenceDataDef: ReferenceDataDef = {}) => {
			referenceDataDef.http!.forEach(httpReferenceDataDef => {
				axios(httpReferenceDataDef)
					.then(function (response) {
						set(`${REFERENCE_DATA_STORE_KEY}.${httpReferenceDataDef.name}`, response.data)
					})
			})
		}
	}
}