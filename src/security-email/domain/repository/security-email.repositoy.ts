import { PaginationOptions } from "src/common/interfaces";
import { SecurityEmailInterface } from "../interfaces/security-email.interface";

export interface SecurityEmailRepository {
    create(email: string): Promise<void>;
    findAll(paginationOptions: PaginationOptions): Promise<SecurityEmailInterface[]>;
    findOne(id: string): Promise<SecurityEmailInterface | null>;
    update(id: string, newEmail: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}

export interface SecurityEmailDatasource extends SecurityEmailRepository{

}