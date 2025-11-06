import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Gender } from "src/common/enums";
import { CreateUserOptions } from "../interfaces";

export class CreateUserDto implements CreateUserOptions{
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
    
    @IsEnum(Gender)
    @MinLength(1)
    @ApiProperty({enum: Gender})
    gender: Gender;

}