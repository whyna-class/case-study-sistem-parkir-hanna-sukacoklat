import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParkanDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { FindParkDto } from './dto/find-prak.dto';

@Injectable()
export class ParkirService {
  constructor(private prisma: PrismaService) {}

  // Hitung tarif sesuai jenis & durasi
  private hitungTotal(jenis_kendaraan: string, durasi: number): number {
    let tarifPertama = 0;
    let tarifLanjut = 0;

    if (jenis_kendaraan === 'roda2') {
      tarifPertama = 3000;
      tarifLanjut = 2000;
    } else if (jenis_kendaraan === 'roda4') {
      tarifPertama = 6000;
      tarifLanjut = 4000;
    } else {
      // jika jenis salah, kembalikan 0 (validasi di DTO)
      return 0;
    }

    if (durasi <= 1) return tarifPertama;
    return tarifPertama + (durasi - 1) * tarifLanjut;
  }

  // CREATE
  async create(dto: CreateParkanDto) {
    const total = this.hitungTotal(dto.jenis_kendaraan, dto.durasi);

    const created = await this.prisma.parkir.create({
      data: {
        plat_nomor: dto.plat_nomor,
        jenis_kendaraan: dto.jenis_kendaraan,
        durasi: dto.durasi,
        total,
      },
    });

    return created;
  }

  // FIND ALL with search/filter/pagination
  async findAll(query: FindParkDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.search) {
      where.plat_nomor = { contains: query.search, mode: 'insensitive' };
    }

    if (query.jenis) {
      where.jenis_kendaraan = query.jenis;
    }

    const [data, totalData] = await Promise.all([
      this.prisma.parkir.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.parkir.count({ where }),
    ]);

    return {
      page,
      limit,
      totalData,
      totalPages: Math.max(1, Math.ceil(totalData / limit)),
      data,
    };
  }

  // FIND ONE
  async findOne(id: number) {
    const data = await this.prisma.parkir.findUnique({ where: { id } });
    if (!data) throw new NotFoundException('Data parkir tidak ditemukan');
    return data;
  }

  // UPDATE (patch durasi and recalc total)
  async update(id: number, dto: UpdateParkDto) {
    const existing = await this.findOne(id);
    const durasiBaru = dto.durasi ?? existing.durasi;
    const totalBaru = this.hitungTotal(existing.jenis_kendaraan, durasiBaru);

    const updated = await this.prisma.parkir.update({
      where: { id },
      data: {
        durasi: durasiBaru,
        total: totalBaru,
      },
    });

    return updated;
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id); // akan throw jika tidak ada
    await this.prisma.parkir.delete({ where: { id } });
    return { message: 'Data parkir berhasil dihapus' };
  }

  // TOTAL PENDAPATAN
  async totalPendapatan() {
    const result = await this.prisma.parkir.aggregate({
      _sum: { total: true },
    });

    return { totalPendapatan: result._sum.total ?? 0 };
  }
}
