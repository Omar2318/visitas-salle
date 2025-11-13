import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/validation';
import { AreaModule } from './area/area.module';
import { SeedModule } from './seed/seed.module';
import { AdminAccountsModule } from './admin-accounts/admin-accounts.module';
import { CommonModule } from './common/common.module';
import { SecurityEmailModule } from './security-email/security-email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),
    AuthModule,
    SeedModule,
    AreaModule,    
    AdminAccountsModule, 
    CommonModule, SecurityEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
