import { applyDecorators } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function RemoveAreaDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Eliminar área',
            description:
                'Elimina un área por su ID. Solo los administradores del sistema pueden realizar esta operación.',
        }),
        ApiOkResponse({
            description: 'Área eliminada correctamente',
            schema: {
                example: { message: 'Area eliminada correctamente' },
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