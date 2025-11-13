import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateVisitorInput } from "src/auth/application/inputs";
import { CreateUserDto } from "src/common/dto";
import { AuthHelper } from "../helpers";

export class CreateVisitorDto extends CreateUserDto implements CreateVisitorInput {
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        AuthHelper.passwordRegex, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    password: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @Matches(/^\+?[1-9]\d{1,14}$/,{message: 'Ingresa un número de télefono valido'})
    phoneNumber: string;

    @IsDate()
    @ApiProperty({type: Date})
    birthDate: Date;
    
}