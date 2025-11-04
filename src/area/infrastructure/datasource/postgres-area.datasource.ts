import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAreaOptions } from "src/area/domain/interfaces";
import { AreaDatasource } from "src/area/domain/repository/area.repository";
import { Area } from "../data/postgres";
import { Repository } from "typeorm";
import { InternalServerError, UserError } from "src/common/errors";

@Injectable()
export class PostgresAreaDatasource implements AreaDatasource {

    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area> 
    ){}
    
    private handleError(error: any): never{
        if(error.constraint === 'UQ_644ffaf8fbde4db798cb47712fe') throw new UserError('El area ya existe');

        throw new InternalServerError();
    }

   async createArea(createAreaOptions: CreateAreaOptions): Promise<void> {
        try{
            const newArea = this.areaRepository.create({name: createAreaOptions.name});

            await this.areaRepository.save(newArea);

        }catch(error){
            this.handleError(error);
        }
    }
}