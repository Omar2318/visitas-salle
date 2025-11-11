import { Injectable } from "@nestjs/common";
import { AdminAccountsRepositoryImpl } from "src/admin-accounts/infrastructure/repository/admin-accounts.impl";
import { NotFoundError, UserError } from "src/common/errors";

@Injectable()
export class FindOne {
    constructor(
        private readonly adminAccountsRepo: AdminAccountsRepositoryImpl,
    ){}

    public async execute(id: string){
        const admin = await this.adminAccountsRepo.findOne(id);
        if(!admin) throw new NotFoundError('Usuario no encontrado');

       return admin.toObject();
    }


}