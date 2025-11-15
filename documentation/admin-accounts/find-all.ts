import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function FindAllDoc() {

    return applyDecorators(

        ApiOkResponse({
            example: [
                {
                    "userId": "7a79c895-40ee-40e1-adfa-95e0202e453f",
                    "email": "aasd@gmail.com",
                    "gender": "masculino",
                    "lastName": "Martinez",
                    "names": "Jorge",
                    "secondLastName": "Morales",
                    "area": {
                        "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                        "name": "Comunicacion"
                    },
                    "adminRole": "coordinador"
                },
                {
                    "userId": "01bb4836-b381-4aba-ba67-b6e37a77eb0d",
                    "email": "omar.ramires098145@gmail.com",
                    "gender": "masculino",
                    "lastName": "Martinez",
                    "names": "Diego",
                    "secondLastName": "Morales",
                    "area": {
                        "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                        "name": "Comunicacion"
                    },
                    "adminRole": "coordinador"
                },
                {
                    "userId": "d64349b9-59e7-4319-8dcc-57a93f2a3a57",
                    "email": "hola2@gmail.com",
                    "gender": "masculino",
                    "lastName": "Gomez",
                    "names": "Damin",
                    "secondLastName": "Morales",
                    "area": {
                        "id": "57f77483-306a-40b0-800b-7f5bc0ecdbca",
                        "name": "Cordinacion"
                    },
                    "adminRole": "director"
                }
            ]
        })
    );

}