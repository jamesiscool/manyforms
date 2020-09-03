import {GetFormDefResponse} from '@manyforms/common'
import Router from 'koa-router'
import {getFormDef} from '../services/formDefService'

export const formDefRouter = new Router()

formDefRouter.get('/formDef/:id/:version', async (ctx, next) => {
	const formDef = getFormDef(ctx.params.id, ctx.params.version)
	ctx.assert(formDef, 404, 'Form definition not found')
	ctx.body = {formDef: formDef} as GetFormDefResponse
	await next()
})
