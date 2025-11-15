import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";
import { PaginationDto } from "src/common/dto";

export class FindEmailsDto extends PaginationDto{
    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiPropertyOptional()
    search?: string;
}