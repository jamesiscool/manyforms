import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
import {formDefRouter} from './routes/formDefRoute'
import {submitRouter} from './routes/submitRoute'

const PORT = Number(process.env.PORT) || 3002

const app = new Koa()

app.use(json())
	.use(logger())
	.use(bodyParser())
	.use(cors({origin: '*'}))

app.use(submitRouter.routes()).use(submitRouter.allowedMethods())
app.use(formDefRouter.routes()).use(formDefRouter.allowedMethods())

app.listen(PORT, () => {
	console.log(`Koa started on port ${PORT}`)
})