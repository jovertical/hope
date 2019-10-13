/* eslint-disable */
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class UsersMigration1570591628052 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true
                    },

                    {
                        name: 'name',
                        type: 'varchar'
                    },

                    {
                        name: 'createdAt',
                        type: 'timestamp without time zone'
                    },

                    {
                        name: 'updatedAt',
                        type: 'timestamp without time zone'
                    }
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USER_NAME',
                columnNames: ['name']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users')
    }
}
