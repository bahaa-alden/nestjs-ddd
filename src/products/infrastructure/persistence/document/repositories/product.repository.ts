import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchemaClass } from '../entities/product.schema';
import { ProductRepository } from '../../product.repository';
import { Product } from '../../../../domain/product';
import { ProductMapper } from '../mappers/product.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ProductDocumentRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductSchemaClass.name)
    private readonly productModel: Model<ProductSchemaClass>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const createdEntity = new this.productModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ProductMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const entityObjects = await this.productModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ProductMapper.toDomain(entityObject),
    );
  }

  async findById(id: Product['id']): Promise<NullableType<Product>> {
    const entityObject = await this.productModel.findById(id);
    return entityObject ? ProductMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Product['id'][]): Promise<Product[]> {
    const entityObjects = await this.productModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      ProductMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Product['id'],
    payload: Partial<Product>,
  ): Promise<NullableType<Product>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.productModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.productModel.findOneAndUpdate(
      filter,
      ProductMapper.toPersistence({
        ...ProductMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ProductMapper.toDomain(entityObject) : null;
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productModel.deleteOne({ _id: id });
  }
}
