import { SecurityEmailInterface } from "../interfaces/security-email.interface";
import { FindEmailsOptions } from "../interfaces";

export interface SecurityEmailRepository {
    create(email: string): Promise<void>;
    findAll(findEmailsOptions: FindEmailsOptions): Promise<SecurityEmailInterface[]>;
    findOne(id: string): Promise<SecurityEmailInterface | null>;
    update(id: string, newEmail: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}

export interface SecurityEmailDatasource extends SecurityEmailRepository{

}