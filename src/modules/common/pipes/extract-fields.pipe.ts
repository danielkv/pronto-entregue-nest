import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExtractFieldsPipe implements PipeTransform {
    transform(info: any): string[] {
        const keys = info.fieldNodes[0].selectionSet.selections.map(f => f.name.value);
        return keys;
    }
}
