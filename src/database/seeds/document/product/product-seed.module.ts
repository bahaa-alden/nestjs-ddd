import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductSchema,
  ProductSchemaClass,
} from '../../../../products/infrastructure/persistence/document/entities/product.schema';
import { ProductSeedService } from './product-seed.service';
import {
  UserSchema,
  UserSchemaClass,
} from '../../../../users/infrastructure/persistence/document/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductSchemaClass.name,
        schema: ProductSchema,
      },
      {
        name: UserSchemaClass.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [ProductSeedService],
  exports: [ProductSeedService],
})
export class ProductSeedModule {}
