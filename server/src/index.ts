import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
import Router from 'koa-router'
import {formDefRouter} from './routes/formDef'

const app = new Koa()
export const router = new Router()

// Hello world
router.get('/', async (ctx, next) => {
	const {name} = <{ name: string }>ctx.request.body
	ctx.body = {msg: 'hello ' + name}
	await next()
})

// Middlewares
app.use(json())
	.use(logger())
	.use(bodyParser())

// Routes
app.use(router.routes()).use(router.allowedMethods())
app.use(formDefRouter.routes()).use(formDefRouter.allowedMethods())

// Listen
app.listen(3002, () => {
	console.log('Koa started')
})