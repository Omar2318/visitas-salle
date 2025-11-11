import { AdminAccountsRepositoryImpl } from "src/admin-accounts/infrastructure/repository/admin-accounts.impl";
import { Injectable } from "@nestjs/common";
import { UpdateAdminAccountInput } from "../inputs";

@Injectable()
export class UpdateAdminAccount {

    constructor(
        private readonly adminAccountsRepo: AdminAccountsRepositoryImpl,
    ){}

    public async execute(userId: string, updateAccount: UpdateAdminAccountInput){
        return this.adminAccountsRepo.updateAccount({userId,...updateAccount});
    }
}