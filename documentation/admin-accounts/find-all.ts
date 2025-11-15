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
                        "userRole": "university admin",
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
                        "userRole": "university admin",
                        "area": {
                            "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                            "name": "Comunicacion"
                        },
                        "adminRole": "coordinador"
                    },
                ]
        })
    );

}