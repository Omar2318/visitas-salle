import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";

import { UserError } from "src/auth/domain/errors";
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from "../inputs";

@Injectable()
export class LoginUser {
    constructor(
        private readonly authRepository: AuthRepositoryImpl,
    ){}

    public async execute(loginUserInput: LoginUserInput): Promise<string>{
        const {email, password} = loginUserInput;

        const user = await this.authRepository.findOneUser({email});
        if(!user) throw new UserError('Credenciales invalidas');

        if(!bcrypt.compareSync(password, user.password)) throw new UserError('Credenciales invalidas');

        return user.id;
    }
}