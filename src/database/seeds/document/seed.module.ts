import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSeedModule } from './user/user-seed.module';
import appConfig from '../../../config/app.config';
import databaseConfig from '../../config/database.config';
import { MongooseConfigService } from '../../mongoose-config.service';
import { ProductSeedModule } from './product/product-seed.module';

@Module({
  imports: [
    ProductSeedModule,
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class SeedModule {}
