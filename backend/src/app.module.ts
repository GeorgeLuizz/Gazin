import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperModule } from './developer/developer.module';
import { PositionModule } from './position/position.module';
import { Developer } from './developer/entity/developer.entity';
import { Position } from './position/entity/position.entity';

@Module({
  imports: [
    DeveloperModule,
    PositionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'code123',
      database: 'CAD_DEV',
      entities: [Developer, Position],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
