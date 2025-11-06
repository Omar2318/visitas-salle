import { Injectable } from "@nestjs/common";
import { CreateAdminAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsRepository } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { PostgresAdminAccountsDatasource } from "../datasource";
import { AreaEntity } from "src/area/domain/entities";
import { UniversityAdminEntity } from "src/admin-accounts/domain/entities";

@Injectable()
export class AdminAccountsRepositoryImpl implements AdminAccountsRepository{

    constructor(
        private readonly adminAccountsDatasource: PostgresAdminAccountsDatasource
    ){}

    findArea(id: string): Promise<AreaEntity | null> {
        return this.adminAccountsDatasource.findArea(id);
    }

    createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity> {
        return this.adminAccountsDatasource.createAccount(createAccountOptions);
    }
}