import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchemaClass } from '../../../../products/infrastructure/persistence/document/entities/product.schema';
import { UserSchemaClass } from '../../../../users/infrastructure/persistence/document/entities/user.schema';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectModel(ProductSchemaClass.name)
    private readonly model: Model<ProductSchemaClass>,
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
  ) {}

  async run() {
    const count = await this.model.countDocuments();

    if (count === 0) {
      const user = await this.userModel.findOne({
        email: 'john.doe@example.com',
      });

      const data = new this.model({
        title: 'The Best Piece Of Art',
        user: user,
      });
      await data.save();
    }
  }
}
