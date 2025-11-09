import { Injectable } from "@nestjs/common";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { PaginationInput } from "src/common/inputs";

@Injectable()
export class GetAllAreas {
    constructor(
        private readonly areaRepository: AreaRepositoryImpl
    ){}

    public execute(paginationInput: PaginationInput){
        return this.areaRepository.getAllAreas(paginationInput);
    }

}