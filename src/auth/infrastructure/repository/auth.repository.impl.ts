import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/auth/domain/entities";
import { PostgresAuthDatasource } from "../datasource";
import { AuthRepository } from "src/auth/domain/repository/auth.repository";
import { CreateVisitorOptions, FindOneUserOptions, UpdateUserOptions } from "src/auth/domain/interfaces";
import { VisitorEntity } from "src/auth/domain/entities/visitor.entity";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: PostgresAuthDatasource
    ){}

    createVisitor(createVisitorOptions: CreateVisitorOptions): Promise<VisitorEntity> {
        return this.authDatasource.createVisitor(createVisitorOptions);
    }

    findOneUser(findOneUserOptions: FindOneUserOptions): Promise<UserEntity | null> {
        return this.authDatasource.findOneUser(findOneUserOptions);
    }

    validateEmail(visitorId: string): Promise<boolean> {
        return this.authDatasource.validateEmail(visitorId);
    }

    updateUser(updateUserOptions: UpdateUserOptions): Promise<UserEntity | null> {
        return this.authDatasource.updateUser(updateUserOptions);
    }


}