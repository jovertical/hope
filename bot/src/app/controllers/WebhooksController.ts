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
                        // When they clicked / pressed the "Get Started" button or
                        // a persistent menu item is pressed...
                        const postback = event.postback

                        switch (postback.payload) {
                            case 'GET_STARTED':
                                // Send a welcome message
                                userMessageSender
                                    .setMessage({
                                        text: `Hey! What's up, ${profile.first_name ||
                                            'buddy'}? I am HOPE. I want to keep you safe from any harmful events with our realiable forecast, emergency kits and incident reporting. For more detailed information and visualization, you can check out the app:`
                                    })
                                    .send()
                                break

                            case 'QUICK_UPDATE':
                                userMessageSender
                                    .setMessage({
                                        text: 'Please tell me what update you want',
                                        quick_replies: [
                                            {
                                                content_type: 'text',
                                                title: 'Weather',
                                                payload: 'QU_WEATHER'
                                            },

                                            {
                                                content_type: 'text',
                                                title: 'Temperature',
                                                payload: 'QU_TEMPERATURE'
                                            },

                                            {
                                                content_type: 'text',
                                                title: 'Earthquakes',
                                                payload: 'QU_EARTHQUAKE'
                                            }
                                        ]
                                    })
                                    .send()
                                break

                            case 'EMERGENCY_KIT':
                                userMessageSender
                                    .setMessage({
                                        text: 'Is there an emergency? What can I provide?',
                                        quick_replies: [
                                            {
                                                content_type: 'text',
                                                title: 'Evacuation Areas',
                                                payload: 'EK_EVACUATION_AREAS'
                                            },
                                            {
                                                content_type: 'text',
                                                title: 'Emergency Hotlines',
                                                payload: 'EK_EMERGENCY_LINES'
                                            }
                                        ]
                                    })
                                    .send()
                                break
                        }
                    } else if (event.message) {
                        console.log(event.message)
                    }
                }
            })()
        }
    }
}
