import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function FindOneDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Obtener área por ID',
            description: 'Busca un área por su identificador UUID.',
        }),
        ApiOkResponse({
            description: 'Área encontrada correctamente',
            schema: {
                example: {
                    id: '57f77483-306a-40b0-800b-7f5bc0ecdbca',
                    name: 'Coordinación',
                },
            },
        }),
        ApiBadRequestResponse({
            description: 'ID inválido',
            schema: {
                example: {
                    "message": "Validation failed (uuid is expected)",
                    "error": "Bad Request",
                    "statusCode": 400
                }
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
        })
    );

}