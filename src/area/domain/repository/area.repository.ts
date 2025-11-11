import { PaginationOptions } from "src/common/interfaces";
import { CreateAreaOptions, UpdateAreaOptions } from "../interfaces";
import { AreaEntity, AreaObject } from "../entities";


export interface AreaRepository {
    createArea(createAreaOptions: CreateAreaOptions): Promise<void>;
    getAllAreas(paginationOptions:PaginationOptions ): Promise<AreaObject[]>
    getArea(id: string): Promise<AreaEntity | null>;
    updateArea(updateAreaOptions: UpdateAreaOptions): Promise<AreaEntity | null>;
    deleteArea(id: string): Promise<boolean>;
}

export interface AreaDatasource extends AreaRepository{
    
}