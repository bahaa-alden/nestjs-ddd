import { NestFactory } from '@nestjs/core';
import { ProductSeedService } from './product/product-seed.service';
import { UserSeedService } from './user/user-seed.service';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(UserSeedService).run();

  await app.get(ProductSeedService).run();

  await app.close();
};

void runSeed();
