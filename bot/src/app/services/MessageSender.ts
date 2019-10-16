/**
 * A service to send messages to the user
 *
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference
 */
import { injectable } from 'inversify'
import * as M from '../../typings/messaging'

@injectable()
export default class MessageSender {
    /**
     * The recipient of the message
     */
    private recipient?: M.Recipient

    /**
     * The sender action to be sent
     *
     * @see https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions/
     */
    private senderAction?: 'mark_seen' | 'typing_on' | 'typing_off'

    /**
     * The message body
     */
    private message?: M.Message

    /**
     * Sets the receiver of the message
     *
     * @param recipient The recepient of the message
     */
    public setRecepient(recipient?: M.Recipient): MessageSender {
        this.recipient = recipient

        return this
    }

    /**
     * Sets the message to be sent
     *
     * @param message The message body
     */
    public setMessage(message?: M.Message): MessageSender {
        this.message = message

        return this
    }

    /**
     * Sets the sender action
     *
     * @param action
     */
    public setSenderAction(action?: 'mark_seen' | 'typing_on' | 'typing_off'): MessageSender {
        this.senderAction = action

        return this
    }

    /**
     * Send a message as a response to the user
     */
    public send(): Promise<void | MessageSender> {
        const qs = 'access_token=' + encodeURIComponent(process.env.FB_PAGE_TOKEN || '')

        return fetch(`https://graph.facebook.com/me/messages?${qs}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: this.recipient,
                message: this.message,
                sender_action: this.senderAction
            })
        })
            .then(res => {
                this.message = undefined
                this.senderAction = undefined

                return res.json()
            })
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }
}
