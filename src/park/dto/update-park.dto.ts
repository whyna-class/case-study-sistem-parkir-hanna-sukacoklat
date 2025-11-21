import { PartialType } from '@nestjs/mapped-types';
import { CreateParkanDto } from './create-park.dto';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateParkDto extends PartialType(CreateParkanDto) {
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'durasi harus lebih dari 0' })
  durasi?: number;
}