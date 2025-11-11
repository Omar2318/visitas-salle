import { Injectable } from "@nestjs/common";
import { CreateAreaOptions, UpdateAreaOptions } from "src/area/domain/interfaces";
import { AreaRepository } from "src/area/domain/repository/area.repository";
import { PostgresAreaDatasource } from "../datasource";
import { AreaEntity, AreaObject } from "src/area/domain/entities";
import { PaginationOptions } from "src/common/interfaces";

@Injectable()
export class AreaRepositoryImpl implements AreaRepository {

    constructor(
        private readonly areaDatasource: PostgresAreaDatasource
    ){}

    createArea(createAreaOptions: CreateAreaOptions): Promise<void> {
        return this.areaDatasource.createArea(createAreaOptions);
    }

    getAllAreas(paginationOptions: PaginationOptions): Promise<AreaObject[]> {
        return this.areaDatasource.getAllAreas(paginationOptions);
    }

    getArea(id: string): Promise<AreaEntity | null> {
        return this.areaDatasource.getArea(id);
    }

    updateArea(updateAreaOptions: UpdateAreaOptions): Promise<AreaEntity | null> {
        return this.areaDatasource.updateArea(updateAreaOptions);
    }

    deleteArea(id: string): Promise<boolean> {
        return this.areaDatasource.deleteArea(id);
    }


}