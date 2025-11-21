import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkModule } from './park/park.module';

@Module({
  imports: [PrismaModule, ParkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
