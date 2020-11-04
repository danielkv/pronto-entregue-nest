import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { RatingDTO } from '../dtos/rating.dto';
import { Rating } from '../entities/rating.entity';
import { IRatingRepository } from '../interfaces/rating.interface';
import { IUpdateRatingEvent } from '../interfaces/update-rating-event.interface';

@Injectable()
export class CreateRatingService {
    constructor(
        @Inject('IRatingRepository') private ratingRepository: IRatingRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(ratingId: Rating['id'], rating: RatingDTO): Promise<Rating> {
        // check if rating exists
        const oldRating = await this.ratingRepository.get(ratingId);
        if (!oldRating) throw new NotFoundException('Avaliação não existe');

        // merge new data
        const mergedRating = this.ratingRepository.merge(oldRating, rating);

        // save
        const updated = await this.ratingRepository.save(mergedRating);

        // events
        const event: IUpdateRatingEvent = {
            rating: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateRating', event);

        // return
        return updated;
    }
}
