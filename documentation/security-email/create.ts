import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";

export function CreateSecEmailDoc() {

    return applyDecorators(

        ApiCreatedResponse({
            example: {
                "message": "Email de seguridad creado correctamente"
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
                }
            }
        })

    );

}