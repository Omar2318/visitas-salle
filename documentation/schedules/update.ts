import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function UpdateScheduleDoc() {

    return applyDecorators(
        ApiOkResponse({
            example: {
                "message": "Horario actualizado correctamente"
            }
        }),
        ApiBadRequestResponse({
            example: {
                "message": "No tienes un horario creado",
                "error": "Bad Request",
                "statusCode": 400
            }
        })
    );

}