import { Injectable } from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";
import { InternalServerError, NotFoundError } from "src/common/errors";

@Injectable()
export class ValidateEmail {
    constructor(
        private readonly authRepository: AuthRepositoryImpl,
        private readonly jwtService: JwtService,
    ){}

    public async execute(token: string){
        try{
            const {visitorId} = this.jwtService.verify(token);

            const validado = await this.authRepository.validateEmail(visitorId);
            
            return validado;

        }catch(error){
            if(error instanceof TokenExpiredError){
                return false;
            }            
            throw new InternalServerError();
        }
        
    }
}