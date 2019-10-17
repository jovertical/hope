import { injectable } from 'inversify'
import { Profile } from '../../typings/identity'
import MessageSender from './MessageSender'

@injectable()
export default class WebhookHandler {
    /**
     * When they clicked / pressed the "Get Started" button or
     * a persistent menu item is pressed...
     *
     * @param postback The postback sent to the webhook
     * @param messageSender This typically has a recipient setup
     * @param profile The facebook user's profile
     */
    public handlePostback(postback: any, messageSender: MessageSender, profile: Profile): void {
        switch (postback.payload) {
            case 'GET_STARTED':
                // Send a welcome message
                messageSender
                    .setMessage({
                        text: `Hey! What's up, ${profile.first_name ||
                            'buddy'}? I am HOPE. I want to keep you safe from any harmful events with our realiable forecast, emergency kits and incident reporting. For more detailed information and visualization, you can check out the app:`
                    })
                    .send()
                break

            case 'QUICK_UPDATE':
                messageSender
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
                messageSender
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
    }

    /**
     * This is sort of a "fallback" handler, events such as sending plain text
     * messages, message attachments etc. should be the trigger for this handler
     *
     * @param message The message sent to the webhook
     * @param messageSender This typically has a recipient setup
     */
    public handleMessage(message: any, messageSender: MessageSender): void {
        if (message.quick_reply) {
        } else if (message.attachments && message.attachments.length > 0) {
            messageSender.setMessage({ text: `Sorry i can't understand that...` }).send()
        }
    }
}
