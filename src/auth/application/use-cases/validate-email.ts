import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";

@Injectable()
export class ValidateEmail {
    constructor(
        private readonly authRepository: AuthRepositoryImpl,
        private readonly jwtService: JwtService,
    ){}

    public async execute(token: string){
        const {visitorId} = this.jwtService.verify(token);
        return this.authRepository.validateEmail(visitorId);
    }
}