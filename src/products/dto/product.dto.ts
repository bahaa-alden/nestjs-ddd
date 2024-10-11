import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
