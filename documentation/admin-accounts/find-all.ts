import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function FindAllDoc() {

    return applyDecorators(

        ApiOkResponse({
            example: [
                {
                    "userId": "d64349b9-59e7-4319-8dcc-57a93f2a3a57",
                    "email": "hola@gmail.com",
                    "gender": "masculino",
                    "lastName": "Gomez",
                    "names": "Damin",
                    "secondLastName": "Morales",
                    "userRole": "university admin",
                    "area": {
                        "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                        "name": "Comunicacion"
                    },
                    "adminRole": "coordinador"
                },
                {
                    "userId": "7a79c895-40ee-40e1-adfa-95e0202e453f",
                    "email": "aasd@gmail.com",
                    "gender": "masculino",
                    "lastName": "Martinez",
                    "names": "Jorge",
                    "secondLastName": "Morales",
                    "userRole": "university admin",
                    "area": {
                        "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                        "name": "Comunicacion"
                    },
                    "adminRole": "coordinador"
                }
            ]
        })
    );

}