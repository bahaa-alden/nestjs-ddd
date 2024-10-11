import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type ProductSchemaDocument = HydratedDocument<ProductSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ProductSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchemaClass',
    autopopulate: true,
  })
  user: UserSchemaClass;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductSchemaClass);
