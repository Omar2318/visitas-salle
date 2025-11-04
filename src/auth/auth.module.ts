import { Module } from '@nestjs/common';
import { AuthService } from './presentation/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './presentation/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAdmin, UniversityAdmin, User, Visitor } from './infrastructure/data/postgres';
import { AuthController } from './presentation/auth.controller';
import { AuthRepositoryImpl } from './infrastructure/repository/auth.repository.impl';
import { PostgresAuthDatasource } from './infrastructure/datasource';
import { CreateVisitor, LoginUser } from './application/use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Visitor,SystemAdmin, UniversityAdmin]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=> {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CreateVisitor, LoginUser, AuthRepositoryImpl, PostgresAuthDatasource],
  exports: [JwtStrategy, PassportModule, JwtModule, TypeOrmModule]
})
export class AuthModule {}
