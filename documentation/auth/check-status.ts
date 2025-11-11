import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function CheckStatusDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Verífica el estado de su sesión',
            description: 'Te devuelve un nuevo token con información del usuario',
        }),
        ApiOkResponse({
            example: {
                "email": "omar.ramirezm65@gmail.com",
                "gender": "masculino",
                "lastName": "Ramirez",
                "names": "Omar",
                "secondLastName": "Morales",
                "userRole": "visitor"
            }
        })
    );

}