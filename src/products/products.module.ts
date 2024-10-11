import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DocumentProductPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    DocumentProductPersistenceModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, DocumentProductPersistenceModule],
})
export class ProductsModule {}
