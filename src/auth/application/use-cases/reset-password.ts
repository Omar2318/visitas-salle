import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";
import { ResetPasswordInput } from "../inputs";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { InternalServerError, UserError } from "src/common/errors";

@Injectable()
export class ResetPassword {

    constructor(
        private readonly authRepository: AuthRepositoryImpl,
        private readonly jwtService: JwtService,
    ) { }

    public async execute(resetPasswordInput: ResetPasswordInput) {
        const { newPassword, token } = resetPasswordInput;
        
        try {
            const { userId } = this.jwtService.verify(token);

            const updatedUser = this.authRepository.updateUser({userId, password: newPassword})

            if(!updatedUser) throw new UserError('No se pudo actualizar su contraseña');

        } catch (error) {

            if (error instanceof TokenExpiredError) {
                throw new UserError('No se pudo actualizar su contraseña')
            }

            if(error instanceof UserError){
                throw new UserError(error.message);
            }

            throw new InternalServerError();
        }
    }

}