import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

interface ISalted {
    password: string;
    salt: string;
}

@Injectable()
export class PasswordService {
    async create(plainTextPassword: string): Promise<string> {
        const newSalt = crypto.randomBytes(16).toString('hex');
        const passwordHash = this.salt(plainTextPassword, newSalt);
        return passwordHash;
    }

    async compare(plainTextPassword: string, hash: string): Promise<boolean> {
        const salt = this.break(hash).salt;
        const comparePasswordHash = this.salt(plainTextPassword, salt);
        return comparePasswordHash === hash;
    }

    private salt(plainTextPassword: string, salt: string): string {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(plainTextPassword);
        const _password = hash.digest('hex');
        return `$${salt}$${_password}`;
    }

    private break(hash: string): ISalted {
        const broke = hash.split('$');

        return {
            salt: broke[1],
            password: broke[2],
        };
    }
}
