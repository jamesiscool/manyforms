import {add} from '@manyforms/common'
import * as Koa from 'koa'
import * as json from 'koa-json'

import * as logger from 'koa-logger'
import * as Router from 'koa-router'

const app = new Koa()
export const router = new Router()

// Hello world
router.get('/', async (ctx, next) => {
	ctx.body = {msg: add(1,2)}

	await next()
})

// Middlewares
app.use(json())
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(3002, () => {
	console.log('Koa started')
})