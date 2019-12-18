import Router from 'koa-router'
import {getFormDef} from '../services/formDef'

export const formDefRouter = new Router()

formDefRouter.get('/formDef/:id/:version', async (ctx, next) => {
	const formDef = getFormDef(ctx.params.id, ctx.params.version)
	if (formDef) {
		ctx.body = formDef
	} else {
		ctx.status = 404
	}
	await next()
})
