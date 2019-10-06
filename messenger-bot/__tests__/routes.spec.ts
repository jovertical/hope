import * as request from 'supertest'
import app from '../src/server'

describe('Webhook Endpoints', () => {
    it('should validate verification token', async () => {
        process.env.WEBHOOK_TOKEN = 'zioQsAxJQdXuijMLa433'

        const res = await request(app)
            .get('/webhook')
            .query({
                'hub.verify_token': process.env.WEBHOOK_TOKEN,
                'hub.challenge': 'CHALLENGE_ACCEPTED'
            })

        expect(res.status).toEqual(200)
        expect(res.text).toEqual('CHALLENGE_ACCEPTED')
    })

    it('should fail if verification token is invalid', async () => {
        process.env.WEBHOOK_TOKEN = 'zioQsAxJQdXuijMLa433'

        const res = await request(app)
            .get('/webhook')
            .query({
                'hub.verify_token': 'invalid_token'
            })

        expect(res.status).toEqual(422)
    })
})
