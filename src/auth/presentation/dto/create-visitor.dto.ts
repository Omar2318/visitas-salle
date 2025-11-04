import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateVisitorInput } from "src/auth/application/inputs";
import { Gender } from "src/auth/domain/enums";

export class CreateVisitorDto implements CreateVisitorInput {
    @IsString()
    @MinLength(1)
    @ApiProperty()
    names: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    lastName: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    secondLastName: string;

    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    password: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({enum: Gender})
    gender: Gender;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    phoneNumber: string;

    @IsDate()
    @ApiProperty({type: Date})
    birthDate: Date;
}