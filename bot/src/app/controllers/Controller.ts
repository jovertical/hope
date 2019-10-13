import { injectable } from 'inversify'
import { interfaces } from 'inversify-express-utils'

@injectable()
export default class Controller implements interfaces.Controller {}
