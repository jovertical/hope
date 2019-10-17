/**
 * Facebook messenger webhook setup & events handler.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/webhook-reference
 */
import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { container } from '../../bootstrap'
import Controller from './Controller'
import MessageSender from '../services/MessageSender'
import WebhookHandler from '../services/WebhookHandler'
import { retrieveProfile } from '../../helpers'

@controller('/webhook')
export default class WebhooksController extends Controller {
    @httpGet('/')
    public async setup(req: Request, res: Response) {
        if (req.query['hub.mode'] !== 'subscribe' || req.query['hub.verify_token'] !== process.env.FB_VERIFY_TOKEN) {
            return res.sendStatus(400)
        }

        return res.send(req.query['hub.challenge'])
    }

    @httpPost('/')
    public async handle(req: Request, res: Response) {
        const data = req.body
        const messageSender = container.get<MessageSender>('MessageSender')
        const webhookHandler = container.get<WebhookHandler>('WebhookHandler')

        if (data.object !== 'page') {
            // We don't care about non page interactions at this point.
            return res.sendStatus(400)
        }

        for (const entry of data.entry) {
            ;(async function() {
                for (const event of entry.messaging) {
                    // The facebook user's Page-scoped ID (PSID).
                    const id = event.sender.id
                    const userMessageSender = messageSender.setRecepient({ id })

                    // Notifies user that the we are preparing something...
                    userMessageSender.setSenderAction('typing_on').send()

                    // We will retrieve the user's information using the PSID.
                    const profile = await retrieveProfile(id, ['first_name', 'gender'])

                    // Notifies user that the we are done...
                    await userMessageSender.setSenderAction('typing_off').send()

                    if (event.postback) {
                        webhookHandler.handlePostback(event.postback, userMessageSender, profile)
                    } else if (event.message) {
                        webhookHandler.handleMessage(event.message, userMessageSender)
                    }
                }
            })()
        }
    }
}
