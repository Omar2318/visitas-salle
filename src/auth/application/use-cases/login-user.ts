import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";

import { UnauthorizedError, UserError } from "src/common/errors";
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from "../inputs";
import { UserEntity } from "src/auth/domain/entities";

@Injectable()
export class LoginUser {
    constructor(
        private readonly authRepository: AuthRepositoryImpl,
    ){}

    public async execute(loginUserInput: LoginUserInput): Promise<UserEntity>{
        const {email, password} = loginUserInput;

        const user = await this.authRepository.findOneUser({email});
        if(!user) throw new UnauthorizedError('Credenciales invalidas');
        if(!bcrypt.compareSync(password, user.password)) throw new UnauthorizedError('Credenciales invalidas');
       
        return user;
    }
}