import { UpdateParkDto } from './dto/update-park.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateParkanDto } from './dto/create-park.dto';
import { ParkirService } from './park.service';
import { FindParkDto } from './dto/find-prak.dto';

@Controller('parkir')
export class ParkiranController {
  constructor(private readonly parkiranService: ParkirService) {}

  // Tambah data parkir
  @Post()
  create(@Body() dto: CreateParkanDto) {
    return this.parkiranService.create(dto);
  }

  // Ambil semua (search / filter / pagination)
  @Get()
  findAll(@Query() query: FindParkDto) {
    return this.parkiranService.findAll(query);
  }

  // Ambil detail by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkiranService.findOne(id);
  }

  // Update durasi -> recalc total
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateParkDto) {
    return this.parkiranService.update(id, dto);
  }

  // Delete data
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkiranService.remove(id);
  }

  // Total pendapatan
  @Get('total')
  totalPendapatan() {
    return this.parkiranService.totalPendapatan();
  }
}
