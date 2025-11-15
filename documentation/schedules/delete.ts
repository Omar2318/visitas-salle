import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function DeleteScheduleDoc() {

    return applyDecorators(
        ApiOkResponse({
            example: {
                "message": "Horario eliminado correctamente"
            }
        }),
        ApiBadRequestResponse({
            example: {
                "message": "No tienes un horario para eliminar",
                "error": "Bad Request",
                "statusCode": 400
            }
        })
    );

}