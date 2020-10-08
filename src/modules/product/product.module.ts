import { Module } from '@nestjs/common';
import { ProductRepositoryProvider } from './repositories/product.repository';

@Module({ providers: [ProductRepositoryProvider] })
export class ProductModule {}
