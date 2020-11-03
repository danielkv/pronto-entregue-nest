import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { Product } from '../../product/entities/product.entity';
import { ProductDTO } from '../dtos/product.dto';
import { IProductRepository } from '../interface/product.repository.interface';
import { IUpdateProductEvent } from '../interface/update-product-event.interface';

@Injectable()
export class UpdateProductService {
    constructor(
        @Inject('IProductRepository') private productRepository: IProductRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(productId: Product['id'], product: ProductDTO): Promise<Product> {
        // check if product exists
        const oldProduct = await this.productRepository.get(productId);
        if (!oldProduct) throw new NotFoundException('Produto não existe');

        // merge
        const mergedInstance = this.productRepository.merge(oldProduct, product);

        // save
        const updated = await this.productRepository.save(mergedInstance);

        // events
        const event: IUpdateProductEvent = {
            product: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateProduct', event);

        // return
        return updated;
    }
}
