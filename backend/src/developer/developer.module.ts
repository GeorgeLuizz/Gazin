import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Module } from '@nestjs/common';
import { Developer } from './entity/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DeveloperController],
  providers: [DeveloperService],
})
export class DeveloperModule {}
