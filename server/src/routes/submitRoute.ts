import {SubmitRequest} from '@manyforms/common'
import Router from 'koa-router'
import {getFormDef} from '../services/formDefService'
import {rerunClientSideValidationOnServer} from '../services/validationService'


export const submitRouter = new Router()

submitRouter.post('/submit', async (ctx, next) => {
	const submission = <SubmitRequest>ctx.request.body

	const formDef = getFormDef(submission.formId, submission.formVersion)
	ctx.assert(formDef, 400, 'Form definition not found')

	const clientValidationPassesOnServer = rerunClientSideValidationOnServer(formDef!, submission.data)
	ctx.assert(clientValidationPassesOnServer, 400, 'Client side validation failed when rerun on server')

	ctx.status = 200
	await next()
})

