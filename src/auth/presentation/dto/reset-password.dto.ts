import { IsJWT, Matches } from "class-validator";
import { AuthHelper } from "../helpers";
import { ResetPasswordInput } from "src/auth/application/inputs";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto implements ResetPasswordInput{
    @Matches(
        AuthHelper.passwordRegex, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    newPassword: string;

    @IsJWT()
    @ApiProperty()
    token: string;
}