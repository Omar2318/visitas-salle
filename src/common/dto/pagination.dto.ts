import { IsOptional, Min } from 'class-validator';
import { PaginationInput } from '../inputs';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto implements PaginationInput {
  @IsOptional()
  @Min(0)
  @ApiPropertyOptional({
    minimum: 0,
    description: 'Número de página (empezando desde 0)',
    example: 0,
  })
  page?: number;

  @IsOptional()
  @Min(1)
  @ApiPropertyOptional({
    minimum: 1,
    description: 'Cantidad de resultados por página',
    example: 10,
  })
  limit?: number;
}
