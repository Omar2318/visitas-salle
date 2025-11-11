import { Module } from '@nestjs/common';
import { AreaService } from './presentation/area.service';
import { AreaController } from './presentation/area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './infrastructure/data/postgres';
import { AuthModule } from 'src/auth/auth.module';
import { AreaRepositoryImpl } from './infrastructure/repository/area.repository.impl';
import { PostgresAreaDatasource } from './infrastructure/datasource/postgres-area.datasource';
import { CreateArea, DeleteArea, GetAllAreas, GetArea, UpdateArea } from './application/use-cases';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Area]),
  ],
  controllers: [AreaController],
  providers: [AreaService, AreaRepositoryImpl, PostgresAreaDatasource, CreateArea, GetAllAreas, GetArea, UpdateArea, DeleteArea],
  exports: [TypeOrmModule, AreaRepositoryImpl]
})
export class AreaModule {}
