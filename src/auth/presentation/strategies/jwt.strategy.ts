import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { User, Visitor } from "src/auth/infrastructure/data/postgres";
import { UserRole } from "src/auth/domain/enums";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Visitor)
        private readonly visitorRepository: Repository<Visitor>,
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET')!,
            jwtFromRequest: ExtractJwt.fromExtractors([

                (req: Request) => {
                    return req?.cookies?.token;
                }

            ]) 
        });
    }


    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
       
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new UnauthorizedException('Token not valid');
        if(user.role === UserRole.Visitor){
            const visitor = await this.visitorRepository.findOneBy({user: {id: user.id}});
            if(!visitor) throw new InternalServerErrorException('Error en el servidor');

            if(!visitor.emailVerified) throw new UnauthorizedException('Email no verificado');
            
        }       

        return user;
    }
}