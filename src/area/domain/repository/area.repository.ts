import { CreateAreaOptions } from "../interfaces";


export interface AreaRepository {
    createArea(createAreaOptions: CreateAreaOptions): Promise<void>;
}

export interface AreaDatasource extends AreaRepository{
    
}