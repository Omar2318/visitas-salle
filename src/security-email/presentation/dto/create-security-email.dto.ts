import { IsEmail } from "class-validator";

export class CreateSecurityEmailDto {
    @IsEmail()
    email: string;
}
