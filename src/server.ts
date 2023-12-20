import express from 'express'
import productRouter from './routes/product'
import updateRouter from './routes/update'
import updatePointRouter from './routes/updatePoint'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protectRoutes } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

app.use(cors())
app.use(morgan('dev')) //logging
app.use(express.json()) // allows client to send json to us
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => { // example of custom middleware used to augment the request object for the whole app. All route request objects have access to this
    next()
})


app.use('/api', protectRoutes, productRouter, updateRouter, updatePointRouter)
app.post('/user', createNewUser)
app.post('/signin', signin)

export default app