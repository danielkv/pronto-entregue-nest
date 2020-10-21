import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRole } from '../interfaces/guard-roles.interface';

export const AclRoles = createParamDecorator((data: unknown, context: ExecutionContext): IRole[] => {
    const reflector = new Reflector();

    return reflector.getAllAndMerge<IRole[]>('roles', [context.getHandler(), context.getClass()]);
});
