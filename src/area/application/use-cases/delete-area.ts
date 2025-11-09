import { Injectable } from "@nestjs/common";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { NotFoundError } from "src/common/errors";

@Injectable()
export class DeleteArea {
    constructor(
        private readonly areaRepository: AreaRepositoryImpl
    ){}

    public async execute(id: string){
        const wasDeleted = await this.areaRepository.deleteArea(id);
      
        if(!wasDeleted) throw new NotFoundError('Area no encontrada');

    }
}