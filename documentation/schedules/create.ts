import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";

export function CreateScheduleDoc() {

    return applyDecorators(

        ApiCreatedResponse({
            example: {
                "message": "Horario creado correctamente"
            }
        }),
        ApiBadRequestResponse({
            description: 'Ya tenias un horario creado', example: {
                "message": "No puedes insertar otro horario",
                "error": "Bad Request",
                "statusCode": 400
            }
        })

    );

}