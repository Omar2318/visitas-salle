import { IsDate, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Gender } from "src/auth/domain/enums";
import { CreateVisitorInput } from "src/auth/domain/inputs";

export class CreateVisitorDto implements CreateVisitorInput {
    @IsString()
    @MinLength(1)
    names: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsString()
    @MinLength(1)
    secondLastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    gender: Gender;

    @IsString()
    @MinLength(1)
    phoneNumber: string;

    @IsDate()
    birthDate: Date;
}