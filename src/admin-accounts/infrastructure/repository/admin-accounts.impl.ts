import { Injectable } from "@nestjs/common";
import { CreateAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsRepository } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { PostgresAdminAccountsDatasource } from "../datasource";

@Injectable()
export class AdminAccountsRepositoryImpl implements AdminAccountsRepository{

    constructor(
        private readonly adminAccountsDatasource: PostgresAdminAccountsDatasource
    ){}

    createAccount(createAccountOptions: CreateAccountOptions): Promise<boolean> {
        return this.adminAccountsDatasource.createAccount(createAccountOptions);
    }
}