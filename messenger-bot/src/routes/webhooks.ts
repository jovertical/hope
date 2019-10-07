/**
 * Webhook Routes
 *
 * Route declarations here are prefixed with "/webhook"
 * See https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup
 */
import * as express from 'express'

const router = express.Router()

/**
 * This is used so that Facebook can verify that they have
 * the correct Webhook location for the app.
 *
 * The Webhook token must be set in the app's configuration page
 * as well as in the server's environment.
 */
router.get('/', (req, res) => {
    if (req.query['hub.verify_token'] !== process.env.WEBHOOK_TOKEN) {
        return res.status(422).send('Error, wrong token')
    }

    res.send(req.query['hub.challenge'])
})

/**
 * Once the Webhook is verified this is where we will receive
 * all interactions from the users of our Messenger Application.
 */
router.post('/', (req, res) => {
    /*
        We must send back a status of 200 (success) within 20 seconds
        to let facebook know we've successfully received the callback.
        Otherwise, the request will time out.

        When a request times out from Facebook the service attempts
        to resend the message.
        
        This is why it is good to send a response immediately so we
        don't get duplicate messages in the event that a request takes
        awhile to process.
    */
    res.sendStatus(200)

    const body = req.body

    // We don't care about non-page interactions at this point.
    if (body.object !== 'page') {
        return res.sendStatus(404)
    }

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(entry => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let event = entry.messaging[0]

        console.log(event)
    })
})

export default router
