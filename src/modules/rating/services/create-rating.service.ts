import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { RatingDTO } from '../dtos/rating.dto';
import { Rating } from '../entities/rating.entity';
import { ICreateRatingEvent } from '../interfaces/create-rating-event.interface';
import { IRatingRepository } from '../interfaces/rating.interface';

@Injectable()
export class CreateRatingService {
    constructor(
        @Inject('IRatingRepository') private ratingRepository: IRatingRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(rating: RatingDTO): Promise<Rating> {
        // create instance
        const ratingInstance = this.ratingRepository.create(rating);

        // save
        const created = await this.ratingRepository.save(ratingInstance);

        // events
        const event: ICreateRatingEvent = {
            rating: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createRating', event);

        // return
        return created;
    }
}
