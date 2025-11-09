import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { CreateArea, DeleteArea, GetAllAreas, GetArea, UpdateArea } from '../application/use-cases';
import { HandleError } from 'src/common/errors';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class AreaService {

  constructor(
    private readonly createAreaUseCase: CreateArea,
    private readonly getAllAreasUseCase: GetAllAreas,
    private readonly getAreaUseCase: GetArea,
    private readonly updateAreaUseCase: UpdateArea,
    private readonly deleteAreaUseCase: DeleteArea,
  ){}

  async create(createAreaDto: CreateAreaDto) {
    try{
      await this.createAreaUseCase.execute(createAreaDto);
    }catch(error){
      HandleError.throw(error);
    }
   
  }

  findAll(paginationDto: PaginationDto) {
    return this.getAllAreasUseCase.execute(paginationDto);
  }

  async findOne(id: string) {
    try{
      return await this.getAreaUseCase.execute(id);
    }catch(error){
      HandleError.throw(error);
    }
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    try{
      return await this.updateAreaUseCase.execute(id, updateAreaDto);
    }catch(error){
      HandleError.throw(error);
    }
  }

  async remove(id: string) {
    try{
      return await this.deleteAreaUseCase.execute(id);
    }catch(error){
      HandleError.throw(error);
    }
  }
}
