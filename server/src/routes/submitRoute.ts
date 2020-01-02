import {SubmitRequest} from '@manyforms/common'
import Router from 'koa-router'

export const submitRouter = new Router()

submitRouter.post('/submit', async (ctx, next) => {
	const submission = <SubmitRequest>ctx.request.body
	console.log('submission:', submission)
	ctx.status = 200
	await next()
})

