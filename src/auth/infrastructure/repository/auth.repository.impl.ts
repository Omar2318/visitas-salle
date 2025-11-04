import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/domain/entities";
import { PostgresAuthDatasource } from "../datasource";
import { AuthRepository } from "src/auth/domain/repository/auth.repository";
import { CreateVisitorInput } from "src/auth/domain/inputs";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: PostgresAuthDatasource
    ){}

    createVisitor(createVisitorInput: CreateVisitorInput): Promise<UserEntity> {
        return this.authDatasource.createVisitor(createVisitorInput);
    }


}