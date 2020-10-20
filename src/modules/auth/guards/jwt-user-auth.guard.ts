import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err) {
            throw err;
        }

        if (!user) return null;

        return user;
    }
}
