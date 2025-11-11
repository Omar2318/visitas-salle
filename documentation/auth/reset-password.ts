import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function ResetPasswordDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Cambia su contraseña',
            description: 'Al usuario le llego el correo y tiene su token para cambiar contraseña'
        }),
        ApiOkResponse({
            example: {
                "message": "Contraseña actualizada correctamente"
            }
        })
    );

}