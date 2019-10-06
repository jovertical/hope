import * as express from 'express'
import * as bodyParser from 'body-parser'
import webhooks from './routes/webhooks'

// Create webserver
const app = express()

// Register parsers
app.use(bodyParser.json())

// Load application routes
app.use('/webhook', webhooks)

// Set application defaults
app.set('port', process.env.PORT || 3000)

// Sets server port and logs message on success
app.listen(app.get('port'), () =>
    console.log('Hope running on port: ', app.get('port'))
)
