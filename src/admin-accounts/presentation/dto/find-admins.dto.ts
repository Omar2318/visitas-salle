import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";
import { FindAdminsInput } from "src/admin-accounts/application/inputs";
import { PaginationDto } from "src/common/dto";

export class FindAdminsDto extends PaginationDto implements FindAdminsInput{
    @IsString()
    @IsOptional()
    @MinLength(1)
    @ApiPropertyOptional()
    search?: string;
}