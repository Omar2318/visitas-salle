import { Module } from '@nestjs/common';
import { SchedulesService } from './presentation/schedules.service';
import { SchedulesController } from './presentation/schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './infrastructure/data/postgres';
import { PostgresScheduleDs } from './infrastructure/datasource/postgres-schedule.datasource';
import { ScheduleRepositoryImpl } from './infrastructure/repository/schedule.repository.impl';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    AuthModule,
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService,PostgresScheduleDs, ScheduleRepositoryImpl],
})
export class SchedulesModule {}
