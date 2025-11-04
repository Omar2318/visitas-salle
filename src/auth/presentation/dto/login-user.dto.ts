import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { LoginUserInput } from "src/auth/application/inputs";

export class LoginUserDto implements LoginUserInput{

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    password: string;

}