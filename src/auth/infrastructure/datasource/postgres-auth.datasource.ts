import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/domain/entities";
import { User, Visitor } from "../data/postgres";
import { Repository } from "typeorm";
import { AuthDatasource } from "src/auth/domain/repository/auth.repository";
import { CreateVisitorInput } from "src/auth/domain/inputs";
import { UserRole } from "src/auth/domain/enums";
import { InternalServerError, UserError } from "src/auth/domain/errors";

@Injectable()
export class PostgresAuthDatasource implements AuthDatasource{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Visitor)
        private readonly visitorRepository: Repository<Visitor>
    ){}

    private handleError(error: any):never{
        if(error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22'){
            throw new UserError('El email ya esta registrado');
        }

        throw new InternalServerError();
        
    }

    public async createVisitor(createVisitorInput: CreateVisitorInput): Promise<UserEntity> {
        try{
            const {phoneNumber,birthDate} = createVisitorInput;
            const newVisitor = this.visitorRepository.create({
                birthDate,
                phoneNumber,
                user:{ ...createVisitorInput, role: UserRole.Visitor}
            });

            const visitor = await this.visitorRepository.save(newVisitor);
            return UserEntity.fromObject(visitor);
        }catch(error){
            this.handleError(error);
        }
    }

    
}