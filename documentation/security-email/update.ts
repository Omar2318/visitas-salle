import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

export function UpdateSecEmailDoc() {

    return applyDecorators(

        ApiOkResponse({
            example: {
                "message": "Email de seguridad actualizado correctamente"
            }
        }),
        ApiBadRequestResponse({
            examples: {
                datosIncorrectos: {
                    summary: 'Datos faltantes o incorrectos',
                    value: {
                        "message": [
                            "email must be an email"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    }
                },
                emailExistente: {
                    summary: 'Email existente',
                    value: {
                        "message": "El email ya existe",
                        "error": "Bad Request",
                        "statusCode": 400
                    }
                },
            }
        }),
        ApiNotFoundResponse({
            example: {
                "message": "Email no encontrado",
                "error": "Not Found",
                "statusCode": 404
            }
        })

    );

}