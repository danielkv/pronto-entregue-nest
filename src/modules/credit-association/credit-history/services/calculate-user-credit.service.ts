import { Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';

@Injectable()
export class CalculateUserCreditService {
    /* constructor(private listCreditHistoriesService: ListCreditHistoriesService) {}

    async execute(userId: User['id']): Promise<number> {
        const creditHistories = await this.listCreditHistoriesService.execute({ userId });

        return creditHistories.reduce<number>((total, creditHistory) => total + creditHistory.value, 0);
    } */
}
