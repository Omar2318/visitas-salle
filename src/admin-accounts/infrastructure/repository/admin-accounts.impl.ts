import { Injectable } from "@nestjs/common";
import { CreateAdminAccountOptions, UniversityAdminObject, UpdateAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsRepository } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { PostgresAdminAccountsDatasource } from "../datasource";
import { AreaEntity } from "src/area/domain/entities";
import { UniversityAdminEntity } from "src/admin-accounts/domain/entities";
import { PaginationOptions } from "src/common/interfaces";
import { FindAdminsInput } from "src/admin-accounts/application/inputs";

@Injectable()
export class AdminAccountsRepositoryImpl implements AdminAccountsRepository{

    constructor(
        private readonly adminAccountsDatasource: PostgresAdminAccountsDatasource
    ){}

    createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity> {
        return this.adminAccountsDatasource.createAccount(createAccountOptions);
    }

    findAllByPagination(findAdminsInput: FindAdminsInput): Promise<UniversityAdminObject[]> {
        return this.adminAccountsDatasource.findAllByPagination(findAdminsInput);
    }
    findOne(id: string): Promise<UniversityAdminEntity | null> {
        return this.adminAccountsDatasource.findOne(id);
    }

    updateAccount(updateAccountOptions: UpdateAccountOptions): Promise<UniversityAdminEntity | null> {
        return this.adminAccountsDatasource.updateAccount(updateAccountOptions);
    }
}