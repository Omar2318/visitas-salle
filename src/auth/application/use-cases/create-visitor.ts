import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from '../../infrastructure/repository/auth.repository.impl';
import { UserEntity } from "src/auth/domain/entities";
import { CreateVisitorInput } from "../inputs";

@Injectable()
export class CreateVisitor {

    constructor(
        private readonly authRepository: AuthRepositoryImpl,
    ){}

    public execute(createVisitorInput: CreateVisitorInput): Promise<UserEntity>{
        return this.authRepository.createVisitor(createVisitorInput);
    }

}