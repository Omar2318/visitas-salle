import { IsJWT, Matches } from "class-validator";
import { AuthHelper } from "../helpers";
import { ResetPasswordInput } from "src/auth/application/inputs";

export class ResetPasswordDto implements ResetPasswordInput{
    @Matches(
        AuthHelper.passwordRegex, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    newPassword: string;

    @IsJWT()
    token: string;
}