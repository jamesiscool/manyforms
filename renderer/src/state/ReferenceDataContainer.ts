import {ReferenceDataDef} from '../FormDef'
import {createContainer} from './useContainer'

export const ReferenceDataContainer = createContainer((initialReferenceData: ReferenceDataDef = {}) => {
	const referenceData = initialReferenceData.inline || {}
	return {referenceData}
})