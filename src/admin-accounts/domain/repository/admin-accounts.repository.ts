import { AreaEntity } from "src/area/domain/entities";
import { CreateAdminAccountOptions } from "../interfaces";
import { UniversityAdminEntity } from "../entities";

export interface AdminAccountsRepository {
     findArea(id: string): Promise<AreaEntity | null>;
     createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity>;
}

export interface AdminAccountsDatasource extends AdminAccountsRepository{
   
}