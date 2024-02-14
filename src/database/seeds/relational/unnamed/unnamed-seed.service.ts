// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { unnamedEntity } from 'src/unnameds/infrastructure/persistence/relational/entities/unnamed.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class unnamedSeedService {
//   constructor(
//     @InjectRepository(unnamedEntity)
//     private repository: Repository<unnamedEntity>,
//   ) {}

//   async run() {
//     const count = await this.repository.count();

//     if (count === 0) {
//       await this.repository.save(this.repository.create({}));
//     }
//   }
// }
