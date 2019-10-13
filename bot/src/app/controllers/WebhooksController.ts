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
        const sender = container.get<MessageSender>('MessageSender')

        if (data.object !== 'page') {
            // We don't care about non page interactions at this point.
            return res.sendStatus(400)
        }

        for (const entry of data.entry) {
            for (const event of entry.messaging) {
                if (!event.message || event.message.is_echo) {
                    continue
                }

                // Yay! We got a new message!
                // We retrieve the Facebook user ID of the sender
                const senderId = event.sender.id
                const message = {
                    text: 'Hello!'
                }

                sender.send({ id: senderId }, message)
            }
        }
    }
}