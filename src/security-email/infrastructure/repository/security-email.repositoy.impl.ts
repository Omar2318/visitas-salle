import { Injectable } from "@nestjs/common";
import { SecurityEmailRepository } from "src/security-email/domain/repository";
import { PostgresSecEmailDataS } from "../datasource";
import { SecurityEmailInterface } from "src/security-email/domain/interfaces/security-email.interface";
import { FindEmailsOptions } from "src/security-email/domain/interfaces";

@Injectable()
export class SecEmailRepoImpl implements SecurityEmailRepository{

    constructor(
        private readonly securityEmailDatasource : PostgresSecEmailDataS
    ){}

    create(email: string): Promise<void> {
        return this.securityEmailDatasource.create(email);
    }

    update(id: string, newEmail: string): Promise<boolean> {
        return this.securityEmailDatasource.update(id,newEmail);
    }

    findAll(findEmailsOptions: FindEmailsOptions): Promise<SecurityEmailInterface[]> {
        return this.securityEmailDatasource.findAll(findEmailsOptions);
    }

    findOne(id: string): Promise<SecurityEmailInterface | null> {
        return this.securityEmailDatasource.findOne(id);
    }

    remove(id: string): Promise<boolean> {
        return this.securityEmailDatasource.remove(id);
    }


}