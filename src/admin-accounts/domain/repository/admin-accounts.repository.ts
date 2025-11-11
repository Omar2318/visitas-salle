import { AreaEntity } from "src/area/domain/entities";
import { CreateAdminAccountOptions, UniversityAdminObject, UpdateAccountOptions } from "../interfaces";
import { UniversityAdminEntity } from "../entities";
import { PaginationOptions } from "src/common/interfaces";
import { FindAdminsInput } from "src/admin-accounts/application/inputs";

export interface AdminAccountsRepository {
     createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity>;
     findAllByPagination(findAdminsInput: FindAdminsInput): Promise<UniversityAdminObject[]>;
     findOne(id: string): Promise<UniversityAdminEntity | null>;
     updateAccount(updateAccountOptions: UpdateAccountOptions): Promise<UniversityAdminEntity | null>;
}

export interface AdminAccountsDatasource extends AdminAccountsRepository{
   
}