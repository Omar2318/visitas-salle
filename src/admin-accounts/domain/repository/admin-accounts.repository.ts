import { AreaEntity } from "src/area/domain/entities";
import { CreateAdminAccountOptions, UniversityAdminObject } from "../interfaces";
import { UniversityAdminEntity } from "../entities";
import { PaginationOptions } from "src/common/interfaces";

export interface AdminAccountsRepository {
     findArea(id: string): Promise<AreaEntity | null>;
     createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity>;
     findAllByPagination(paginationOptions: PaginationOptions): Promise<UniversityAdminObject[]>;
}

export interface AdminAccountsDatasource extends AdminAccountsRepository{
   
}