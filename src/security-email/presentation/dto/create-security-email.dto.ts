import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateSecurityEmailDto {
    @IsEmail()
    @ApiProperty()
    email: string;
}
