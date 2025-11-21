import { Module } from '@nestjs/common';
import { ParkirService } from './park.service';
import { ParkiranController } from './park.controller';

@Module({
  controllers: [ParkiranController],
  providers: [ParkirService],
})
export class ParkiranModule {}
