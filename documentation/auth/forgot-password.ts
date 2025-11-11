import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function ForgotPasswordDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Olvidó su contraseña',
            description: 'Manda un email para que recupere su contraseña'
        }),
        ApiOkResponse({
            example: {
                "message": "Email mandado correctamente"
            }
        })
    );

}