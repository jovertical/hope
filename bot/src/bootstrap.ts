/**
 * Bootstrap file
 *
 * We initialize express here, set configurations (e.g. parsers) & declare endpoints.
 * This way, routes and default configurations are abstracted so that it can
 * be re-used somewhere else in the app.
 */
import * as express from 'express'
import * as bodyParser from 'body-parser'
import 'reflect-metadata'
import 'isomorphic-unfetch'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import MessageSender from './app/services/MessageSender'
import WebhookHandler from './app/services/WebhookHandler'

// Register controllers
import './app/controllers/WebhooksController'

// Create the container
export const container = new Container()

// Register services here
container.bind<MessageSender>('MessageSender').to(MessageSender)
container.bind<WebhookHandler>('WebhookHandler').to(WebhookHandler)

// Create the server
const server = new InversifyExpressServer(container)

// Configure express
server.setConfig((app: express.Application) => {
    // Add body parsers
    app.use(bodyParser.json())
})

const app = server.build()

export default app
