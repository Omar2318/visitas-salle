import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

export function RemoveSecEmailDoc() {

    return applyDecorators(

        ApiOkResponse({
            example: {
                "message": "Email de seguridad eliminado correctamente"
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