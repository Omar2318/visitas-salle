import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/domain/entities";
import { User } from "../data/postgres";
import { Repository } from "typeorm";
import { AuthDatasource } from "src/auth/domain/repository/auth.repository";
import { CreateVisitorInput } from "src/auth/domain/inputs";

@Injectable()
export class PostgresAuthDatasource implements AuthDatasource{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    createVisitor(createVisitorInput: CreateVisitorInput): void {
        
    }

    
}