import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAreaOptions, UpdateAreaOptions } from "src/area/domain/interfaces";
import { AreaDatasource } from "src/area/domain/repository/area.repository";
import { Area } from "../data/postgres";
import { Repository } from "typeorm";
import { InternalServerError, UserError } from "src/common/errors";
import { AreaEntity, AreaObject } from "src/area/domain/entities";
import { PaginationOptions } from "src/common/interfaces";

@Injectable()
export class PostgresAreaDatasource implements AreaDatasource {

    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ) { }

    private handleError(error: any): never {
        if (error.constraint === 'UQ_644ffaf8fbde4db798cb47712fe') throw new UserError('El área ya existe');

        throw new InternalServerError();
    }

    async createArea(createAreaOptions: CreateAreaOptions): Promise<void> {
        try {
            const newArea = this.areaRepository.create({ name: createAreaOptions.name });

            await this.areaRepository.save(newArea);

        } catch (error) {
            this.handleError(error);
        }
    }

    public async getAllAreas(paginationOptions: PaginationOptions): Promise<AreaObject[]> {
        
        
        const { page = 0, limit = 6 } = paginationOptions;
        
        const areas = await this.areaRepository.find({
            relations: {universityAdmins: {user: true}},
            take: limit,
            skip: (limit * page)
        });

        return areas.map( area => AreaEntity.fromObject(area).toObject());

    }

    public async getArea(id: string): Promise<AreaEntity | null> {

        const area = await this.areaRepository.findOne({
            relations: {universityAdmins: {user: true}},
            where: {id},
        });

        if(!area) return null;

        return AreaEntity.fromObject(area);

    }

    public async updateArea(updateAreaOptions: UpdateAreaOptions): Promise<AreaEntity | null> {
        try{

            const newArea = await this.areaRepository.preload(updateAreaOptions);
            if(!newArea) return null;
            const area = await this.areaRepository.save(newArea);

            return AreaEntity.fromObject(area);

        }catch(error){
            this.handleError(error);
        }

    }

    public async deleteArea(id: string): Promise<boolean> {
        const deleteResults = await this.areaRepository.delete(id);
        
        if(deleteResults.affected === 1) return true;

        return false;
    }


}