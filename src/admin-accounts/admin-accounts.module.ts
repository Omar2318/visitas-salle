import { Module } from '@nestjs/common';
import { AdminAccountsController } from './presentation/admin-accounts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityAdmin } from './infrastructure/data/postgres';
import { AdminAccountsService } from './presentation/admin-accounts.service';
import { CommonModule } from 'src/common/common.module';
import { AdminAccountsRepositoryImpl } from './infrastructure/repository/admin-accounts.impl';
import { PostgresAdminAccountsDatasource } from './infrastructure/datasource';
import { CreateAdminAccount } from './application/use-cases';
import { AreaModule } from 'src/area/area.module';

@Module({
  imports: [
    AuthModule, 
    AreaModule,
    CommonModule,
    TypeOrmModule.forFeature([UniversityAdmin])
  ],
  controllers: [AdminAccountsController],
  providers: [AdminAccountsService, AdminAccountsRepositoryImpl,PostgresAdminAccountsDatasource, CreateAdminAccount],
})
export class AdminAccountsModule {}
