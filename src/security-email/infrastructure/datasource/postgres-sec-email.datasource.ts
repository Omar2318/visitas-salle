import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationOptions } from "src/common/interfaces";
import { SecurityEmailDatasource } from "src/security-email/domain/repository";
import { SecurityEmail } from "../data/postgres";
import { Repository } from "typeorm";
import { InternalServerError, UserError } from "src/common/errors";
import { SecurityEmailInterface } from "src/security-email/domain/interfaces/security-email.interface";

@Injectable()
export class PostgresSecEmailDataS implements SecurityEmailDatasource{

    constructor(
        @InjectRepository(SecurityEmail)
        private readonly securityEmailRepo: Repository<SecurityEmail>,
    ){}

    private HandleError (error: any): never{
        if(error.constraint === 'UQ_40886757bb46f59fb3ee427eb03') throw new UserError('El email ya existe');

        throw new InternalServerError();
    }

    public async create(email: string): Promise<void> {
        try{

            const newEmail = this.securityEmailRepo.create({email});

            await this.securityEmailRepo.save(newEmail);

        }catch(error){
            this.HandleError(error);
        }
    }

    public async findAll(paginationOptions: PaginationOptions): Promise<SecurityEmailInterface[]> {
        const {limit = 5, page = 0} = paginationOptions;
        return await this.securityEmailRepo.find({
            take: limit,
            skip: limit* page,
        });
    }

    public async findOne(id: string): Promise<SecurityEmailInterface | null> {
        const email = this.securityEmailRepo.findOneBy({id});

        if(!email) return null;

        return email;
    }

    public async update(id: string, newEmail: string): Promise<boolean> {
        const nuevo = await this.securityEmailRepo.preload({id, email: newEmail});

        if(!nuevo) return false;

        await this.securityEmailRepo.save(nuevo);

        return true;


    }

    public async remove(id: string): Promise<boolean> {
        const deleteResults = await this.securityEmailRepo.delete(id);
        
        if(deleteResults.affected === 1) return true;

        return false;
    }

    

}