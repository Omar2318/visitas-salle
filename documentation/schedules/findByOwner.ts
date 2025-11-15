import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function FindByOwnerDoc() {

    return applyDecorators(
        ApiOperation({
            summary: 'El admin obtiene su propio horario'
        }),
        ApiOkResponse({
            example: [
                {
                    "id": "955ba84f-05c1-4a66-b1ac-26887a44a79f",
                    "startTime": "08:00",
                    "endTime": "10:00",
                    "dayOfWeek": "monday"
                },
                {
                    "id": "6dce2aac-7bd3-4996-9758-7f5854c132f3",
                    "startTime": "11:00",
                    "endTime": "11:30",
                    "dayOfWeek": "monday"
                }
            ]
        })
    );

}