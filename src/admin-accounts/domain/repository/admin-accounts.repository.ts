import { CreateAccountOptions } from "../interfaces";

export interface AdminAccountsRepository {
     createAccount(createAccountOptions: CreateAccountOptions): Promise<boolean>;
}

export interface AdminAccountsDatasource extends AdminAccountsRepository{
   
}