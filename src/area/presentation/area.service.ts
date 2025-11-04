import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { CreateArea } from '../application/use-cases';
import { HandleError } from 'src/common/errors';

@Injectable()
export class AreaService {

  constructor(
    private readonly createAreaUseCase: CreateArea
  ){}

  async create(createAreaDto: CreateAreaDto) {
    try{
      await this.createAreaUseCase.execute(createAreaDto);
    }catch(error){
      HandleError.throw(error);
    }
   
  }

  findAll() {
    return `This action returns all area`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
