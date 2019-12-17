import {definitions} from '@manyforms/common'
import fs from 'fs'
import path from 'path'

export const getFormDef = (id: number, version: number): definitions.FormDef | null => {
	try {
		const formPath = path.join('form_definitions', id + '_' + version + '.json')
		const formDefString = fs.readFileSync(formPath, 'utf8')
		return JSON.parse(formDefString)
	} catch (error) {
		return null
	}
}