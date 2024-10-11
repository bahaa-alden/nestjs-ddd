import { Product } from '../../../../domain/product';
import { UserMapper } from '../../../../../users/infrastructure/persistence/document/mappers/user.mapper';

import { ProductSchemaClass } from '../entities/product.schema';

export class ProductMapper {
  public static toDomain(raw: ProductSchemaClass): Product {
    const domainEntity = new Product();
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.title = raw.title;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Product): ProductSchemaClass {
    const persistenceSchema = new ProductSchemaClass();
    if (domainEntity.user) {
      persistenceSchema.user = UserMapper.toPersistence(domainEntity.user);
    }

    persistenceSchema.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
