import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './presentation/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAdmin, UniversityAdmin, User, Visitor } from './infrastructure/data/postgres';
import { AreaModule } from 'src/area/area.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Visitor,SystemAdmin, UniversityAdmin]),
    AreaModule,
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
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule, TypeOrmModule]
})
export class AuthModule {}
