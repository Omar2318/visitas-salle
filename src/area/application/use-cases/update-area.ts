import { Injectable } from "@nestjs/common";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { UpdateAreaInput } from "../inputs";
import { NotFoundError } from "src/common/errors";

@Injectable()
export class UpdateArea{
    constructor(
        private readonly areaRepository: AreaRepositoryImpl,
    ){}

    public async execute(id: string, updateAreaInput: UpdateAreaInput){
        const newArea = await this.areaRepository.updateArea({id, ...updateAreaInput});
        if(!newArea) throw new NotFoundError('Area no encontrada');

    }
}