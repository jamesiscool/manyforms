import {formDef} from '@manyforms/common'
import Router from 'koa-router'

export const submitRouter = new Router()

submitRouter.post('/submit', async (ctx, next) => {
	const submission = <formDef.FormDef>ctx.request.body
	console.log('submission:', submission)
	ctx.status = 200
	await next()
})

