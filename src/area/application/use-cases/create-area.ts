import { Injectable } from "@nestjs/common";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { CreateAreaInput } from "../inputs";

@Injectable()
export class CreateArea {

    constructor(
        private readonly areaRepository: AreaRepositoryImpl
    ){}

    public async execute(createAreaInput: CreateAreaInput){
        await this.areaRepository.createArea(createAreaInput);
    }
}