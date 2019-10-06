import * as express from 'express'
import * as bodyParser from 'body-parser'
import webhooks from './routes/webhooks'

// Create webserver
const app = express()

// Register parsers
app.use(bodyParser.json())

// Load application routes
app.use('/webhook', webhooks)

export default app
