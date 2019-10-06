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

    const data = req.body

    console.log(data)
})

export default router
