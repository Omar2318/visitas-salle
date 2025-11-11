import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";

export function CreateAreaDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Crear área',
            description:
                'Crea una nueva área dentro del sistema. Solo disponible para administradores del sistema.',
        }),

        ApiCreatedResponse({
            description: 'Área creada correctamente',
            schema: {
                example: { message: 'Área creada correctamente' },
            },
        }),

        ApiBadRequestResponse({
            description: 'Datos inválidos o área ya existente',
            examples: {
                DatosFaltantes: {
                    summary: "Datos faltantes o incorrectos",
                    value: {
                        "message": [
                            "name must be a string"
                        ],
                        "error": "Bad Request",
                        "statusCode": 400
                    }
                },
                AreaExistente: {
                    summary: "El área ya existe",
                    value: {
                        "message": "El área ya existe",
                        "error": "Bad Request",
                        "statusCode": 400
                    }
                }
            }
        })
    );

}