import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import Controller from './Controller'
import User from '../models/User'

@controller('/users')
export default class UsersController extends Controller {
    /**
     * Get a listing of users
     *
     * @param req Request object
     * @param res Response object
     */
    @httpGet('/')
    public async list(req: Request, res: Response) {
        const repo = await this.getRepository(User)

        const users = await repo.find()

        return res.send(users)
    }

    /**
     * Create a new user.
     *
     * @param req Request object
     * @param res Response object
     */
    @httpPost('/')
    public async store(req: Request, res: Response) {
        const repo = await this.getRepository(User)

        const user = await repo.save({
            name: req.body.name
        })

        return res.send(user)
    }
}
