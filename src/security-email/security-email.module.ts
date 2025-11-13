import { Module } from '@nestjs/common';
import { SecurityEmailService } from './presentation/security-email.service';
import { SecurityEmailController } from './presentation/security-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityEmail } from './infrastructure/data/postgres';
import { SecEmailRepoImpl } from './infrastructure/repository';
import { PostgresSecEmailDataS } from './infrastructure/datasource';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityEmail])],
  controllers: [SecurityEmailController],
  providers: [SecurityEmailService, SecEmailRepoImpl, PostgresSecEmailDataS],
})
export class SecurityEmailModule {}
