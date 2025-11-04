import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/domain/entities";
import { PostgresAuthDatasource } from "../datasource";
import { AuthRepository } from "src/auth/domain/repository/auth.repository";
import { CreateVisitorOptions, FindOneUserOptions } from "src/auth/domain/interfaces";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: PostgresAuthDatasource
    ){}

    createVisitor(createVisitorOptions: CreateVisitorOptions): Promise<UserEntity> {
        return this.authDatasource.createVisitor(createVisitorOptions);
    }

    findOneUser(findOneUserOptions: FindOneUserOptions): Promise<UserEntity | null> {
        return this.authDatasource.findOneUser(findOneUserOptions);
    }


}