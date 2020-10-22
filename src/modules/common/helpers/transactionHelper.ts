import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class TransactionHelper {
    constructor(private connection: Connection) {}

    async execute<T>(runFn: (manager: EntityManager) => Promise<T>) {
        // create new query runner
        const queryRunner = this.create();

        // connect
        await queryRunner.connect();

        // start transaction
        await queryRunner.startTransaction();

        // run function inside transaction
        return runFn(queryRunner.manager)
            .then(async result => {
                // commit
                await queryRunner.commitTransaction();
                return result;
            })
            .catch(async err => {
                // rollback transaction
                await queryRunner.rollbackTransaction();

                // throw error forward
                throw err;
            })
            .finally(async () => {
                // release query runner
                await queryRunner.release();

                //return result;
            });
    }

    private create() {
        return this.connection.createQueryRunner();
    }
}
