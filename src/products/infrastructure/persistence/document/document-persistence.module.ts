import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, ProductSchemaClass } from './entities/product.schema';
import { ProductRepository } from '../product.repository';
import { ProductDocumentRepository } from './repositories/product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSchemaClass.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductDocumentRepository,
    },
  ],
  exports: [ProductRepository],
})
export class DocumentProductPersistenceModule {}
