import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsDatasource } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { UniversityAdmin } from "../data/postgres";
import { Repository } from "typeorm";

@Injectable()
export class PostgresAdminAccountsDatasource implements AdminAccountsDatasource{

    constructor(
        @InjectRepository(UniversityAdmin)
        private readonly universityAdminRepo: Repository<UniversityAdmin>
    ){}

    async createAccount(createAccountOptions: CreateAccountOptions): Promise<boolean> {
        return true;
    }
}