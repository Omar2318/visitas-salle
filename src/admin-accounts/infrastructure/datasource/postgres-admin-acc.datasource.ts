import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdminAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsDatasource } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { UniversityAdmin } from "../data/postgres";
import { Repository } from "typeorm";
import { UserRole } from "src/auth/domain/enums";
import { Area } from "src/area/infrastructure/data/postgres";
import { InternalServerError, UserError } from "src/common/errors";
import { v4 as uuid } from 'uuid';
import { AreaEntity } from "src/area/domain/entities";
import { UniversityAdminEntity } from "src/admin-accounts/domain/entities";


@Injectable()
export class PostgresAdminAccountsDatasource implements AdminAccountsDatasource{

    constructor(
        @InjectRepository(UniversityAdmin)
        private readonly universityAdminRepo: Repository<UniversityAdmin>,
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ){}

    private handleError(error): never{
        if(error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') throw new UserError('El email ya esta registrado');
        console.log(error);
        throw new InternalServerError();
    }

    public async findArea(id: string): Promise<AreaEntity | null> {
        const area = await this.areaRepository.findOneBy({id});
        if(!area) return null;

        return AreaEntity.fromObject(area);
    }

    public async createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity> {

        const {role, areaId} = createAccountOptions;
        try{
    
            const newAdmin = this.universityAdminRepo.create({
                role,
                area: {id: areaId},
                user: {
                    ...createAccountOptions,
                    role: UserRole.UniversityAdmin,
                    password: uuid(),
                }
            });
            
            await this.universityAdminRepo.save(newAdmin);

            return UniversityAdminEntity.fromObject(newAdmin);
            
        }catch(error){
            this.handleError(error);
            
        }
       
    }
}