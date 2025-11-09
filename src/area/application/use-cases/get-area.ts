import { Injectable } from "@nestjs/common";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";
import { NotFoundError } from "src/common/errors";

@Injectable()
export class GetArea {
    constructor(
        private readonly areaRepository: AreaRepositoryImpl
    ){}

    public async execute (id: string) {
        const area = await this.areaRepository.getArea(id);
        if(!area) throw new NotFoundError('Area no encontrada');
        return area.toObject();
    }
}