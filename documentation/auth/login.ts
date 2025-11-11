import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function LoginUserDoc() {

    return applyDecorators(

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