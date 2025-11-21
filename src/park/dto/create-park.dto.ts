import { IsIn, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateParkanDto {
  @IsNotEmpty({ message: 'plat_nomor tidak boleh kosong' })
  plat_nomor: string;

  @IsIn(['roda2', 'roda4'], {
  message: 'jenis_kendaraan harus "roda2" atau "roda4"',})
  jenis_kendaraan: string;

  @IsInt()
  @Min(1, { message: 'durasi harus lebih dari 0' })
  durasi: number;
}

