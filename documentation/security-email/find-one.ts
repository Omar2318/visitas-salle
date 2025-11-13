import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";

export function FindOneSecEmDoc() {

    return applyDecorators(

        ApiBadRequestResponse({
            example: {
                "message": "Email no encontrado",
                "error": "Not Found",
                "statusCode": 404
            }
        }),

        ApiOkResponse({
            example: {
                "id": "caf55b43-c7f4-45b5-b163-ae35a1f9206d",
                "email": "tidac32136@canvect.com"
            }
        })

    );

}