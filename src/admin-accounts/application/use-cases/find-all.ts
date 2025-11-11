import { Injectable } from "@nestjs/common";
import { AdminAccountsRepositoryImpl } from "src/admin-accounts/infrastructure/repository/admin-accounts.impl";
import { PaginationInput } from "src/common/inputs";

@Injectable()
export class FindAll {
    constructor(
        private readonly adminAccountsRepo: AdminAccountsRepositoryImpl,
    ){}

    public execute(paginationInput: PaginationInput){
        return this.adminAccountsRepo.findAllByPagination(paginationInput);
    }
}