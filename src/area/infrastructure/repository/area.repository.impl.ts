import { Injectable } from "@nestjs/common";
import { CreateAreaOptions } from "src/area/domain/interfaces";
import { AreaRepository } from "src/area/domain/repository/area.repository";
import { PostgresAreaDatasource } from "../datasource/postgres-area.datasource";

@Injectable()
export class AreaRepositoryImpl implements AreaRepository {

    constructor(
        private readonly areaDatasource: PostgresAreaDatasource
    ){}

    createArea(createAreaOptions: CreateAreaOptions): Promise<void> {
        return this.areaDatasource.createArea(createAreaOptions);
    }
}