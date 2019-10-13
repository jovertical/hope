/**
 * A service to send messages to the user
 *
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference
 */
import { injectable } from 'inversify'
import { QuickReply, Message, Recipient } from 'typings/messaging'

@injectable()
export default class MessageSender {
    /**
     * Send a message as a response to the user
     *
     * @param recipient
     * @param message
     * @param quickReplies
     */
    public send(recipient: Recipient, message: Message, quickReplies?: Array<QuickReply>) {
        const qs = 'access_token=' + process.env.FB_PAGE_TOKEN

        return fetch(`https://graph.facebook.com/me/messages?${qs}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient,
                message,
                quickReplies
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
}
