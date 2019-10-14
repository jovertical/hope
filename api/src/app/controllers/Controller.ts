import { injectable } from 'inversify'
import { interfaces } from 'inversify-express-utils'
import { Connection, createConnection, getConnection } from 'typeorm'
import { getDatabaseConnection } from '../../helpers'

@injectable()
export default class Controller implements interfaces.Controller {
    /**
     * Get the repository of the model.
     *
     * @param model The model of the repository.
     */
    public getRepository(model: any) {
        const connectionName = getDatabaseConnection()

        return createConnection(connectionName)
            .then((con: Connection) => con.getRepository(model))
            .catch(() => getConnection(connectionName).getRepository(model))
    }
}
