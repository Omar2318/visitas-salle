import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from '../../infrastructure/repository/auth.repository.impl';
import { CreateVisitorInput } from "src/auth/domain/inputs";
import { UserEntity } from "src/auth/domain/entities";

@Injectable()
export class CreateVisitor {

    constructor(
        private readonly authRepository: AuthRepositoryImpl,
    ){}

    public execute(createVisitorInput: CreateVisitorInput): Promise<UserEntity>{
        return this.authRepository.createVisitor(createVisitorInput);
    }
}