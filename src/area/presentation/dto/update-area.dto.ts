import { PartialType } from '@nestjs/swagger';
import { CreateAreaDto } from './create-area.dto';
import { UpdateAreaInput } from 'src/area/application/inputs';

export class UpdateAreaDto extends PartialType(CreateAreaDto) implements UpdateAreaInput{}
