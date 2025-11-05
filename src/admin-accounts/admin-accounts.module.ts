import { Module } from '@nestjs/common';
import { AdminAccountsController } from './presentation/admin-accounts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityAdmin } from './infrastructure/data/postgres';
import { AdminAccountsService } from './presentation/admin-accounts.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UniversityAdmin])],
  controllers: [AdminAccountsController],
  providers: [AdminAccountsService],
})
export class AdminAccountsModule {}
