import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { Rating } from '../entities/rating.entity';
import { IHideShowRatingEvent } from '../interfaces/hide-show-rating-event.interface';
import { IRatingRepository } from '../interfaces/rating.interface';

@Injectable()
export class HideRatingService {
    constructor(
        @Inject('IRatingRepository') private ratingRepository: IRatingRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(ratingId: Rating['id']): Promise<Rating> {
        // check if rating exists
        const oldRating = await this.ratingRepository.get(ratingId);
        if (!oldRating) throw new NotFoundException('Avaliação não existe');

        // merge new data
        const mergedRating = this.ratingRepository.merge(oldRating, { hidden: true });

        // hide
        await this.ratingRepository.hide(ratingId);

        // events
        const event: IHideShowRatingEvent = {
            rating: mergedRating,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('hideShowRating', event);

        // return
        return mergedRating;
    }
}
