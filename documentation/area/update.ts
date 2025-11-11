import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function UpdateAreaDoc() {

    return applyDecorators(
        ApiOperation({
            summary: 'Actualizar área',
            description:
                'Permite modificar los datos de un área existente. Requiere permisos de administrador del sistema.',
        }),
        ApiOkResponse({
            description: 'Área actualizada correctamente',
            schema: {
                example: { message: 'Area actualizada correctamente' },
            },
        }),
        ApiNotFoundResponse({
            description: 'Área no encontrada',
            schema: {
                example: {
                    message: 'Área no encontrada',
                    error: 'Not Found',
                    statusCode: 404,
                },
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