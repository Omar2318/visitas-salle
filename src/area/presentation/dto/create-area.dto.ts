import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateAreaInput } from "src/area/application/inputs";

export class CreateAreaDto implements CreateAreaInput {
    @IsString()
    @ApiProperty({example: 'coordinacion', required: true})
    name: string;
}
