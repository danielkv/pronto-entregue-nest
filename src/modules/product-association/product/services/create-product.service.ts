import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { Product } from '../../product/entities/product.entity';
import { ProductDTO } from '../dtos/product.dto';
import { ICreateProductEvent } from '../interface/create-product-event.interface';
import { IProductRepository } from '../interface/product.repository.interface';

@Injectable()
export class CreateProductService {
    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(product: ProductDTO): Promise<Product> {
        // create instances
        const productInstance = this.productRepository.create(product);

        // save
        const created = await this.productRepository.save(productInstance);

        // events
        const event: ICreateProductEvent = {
            product: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createProduct', event);

        // return
        return created;
    }
}
