import { AdminAccountsRepositoryImpl } from "src/admin-accounts/infrastructure/repository/admin-accounts.impl";
import { Injectable } from "@nestjs/common";
import { UpdateAdminAccountInput } from "../inputs";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { NotFoundError, UserError } from "src/common/errors";

@Injectable()
export class UpdateAdminAccount {

    constructor(
        private readonly adminAccountsRepo: AdminAccountsRepositoryImpl,
        private readonly areaRepo: AreaRepositoryImpl,
    ){}

    public async execute(userId: string, updateAccount: UpdateAdminAccountInput){
        const {areaId} = updateAccount;
        if(areaId){
            const area = await this.areaRepo.getArea(areaId);
            if(!area) throw new UserError('El area no existe');
        }
        const admin = await this.adminAccountsRepo.updateAccount({userId,...updateAccount});
        if(!admin) throw new NotFoundError('Administrador no encontrado');

       
        return admin.toObject();
    }
}