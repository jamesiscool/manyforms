import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
//import Router from 'koa-router'
import {formDefRouter} from './routes/formDef'
import {submitRouter} from './routes/submit'

const app = new Koa()
//export const router = new Router()

app.use(json())
	.use(logger())
	.use(bodyParser())

//app.use(router.routes()).use(router.allowedMethods())
app.use(submitRouter.routes()).use(submitRouter.allowedMethods())
app.use(formDefRouter.routes()).use(formDefRouter.allowedMethods())


app.listen(3002, () => {
	console.log('Koa started http://localhost:3002')
})