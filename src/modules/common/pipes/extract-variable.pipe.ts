import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExtractVariablePipe<T> implements PipeTransform {
    constructor(private key: string) {}
    transform(info: any): T | null {
        const variables = info.variableValues;

        if (variables[this.key]) return variables[this.key];

        return null;
    }
}
