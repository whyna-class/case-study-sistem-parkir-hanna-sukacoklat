import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindParkDto {
  @IsOptional()
  @IsString()
  search?: string; // search by plat_nomor (partial)

  @IsOptional()
  @IsIn(['roda2', 'roda4'], {
    message: 'jenis hanya boleh "roda2" atau "roda4"',
  })
  jenis?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
