import { IsString } from "class-validator";
import { CreateAreaInput } from "src/area/application/inputs";

export class CreateAreaDto implements CreateAreaInput {
    @IsString()
    name: string;
}
