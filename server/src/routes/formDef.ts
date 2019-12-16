import Router from 'koa-router'
import {getFormDef} from '../services/formDef'

export const formDefRouter = new Router()

formDefRouter.get('/formDef/:id/:version', async (ctx, next) => {
	try {
		ctx.body = getFormDef(ctx.params.id, ctx.params.version)
	} catch (error) {
		if (error.errno == -4058) { // Error: ENOENT: no such file or directory
			console.warn('getFormDef - no such file or directory', error)
			ctx.status = 404
		} else {
			throw error
		}
	}
	await next()
})

formDefRouter.get('/hello2', async (ctx, next) => {
	ctx.body = 'hello2'
	await next()
})