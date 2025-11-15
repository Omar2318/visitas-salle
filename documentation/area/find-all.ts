import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function FindAllDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Obtener todas las áreas',
            description:
                'Devuelve la lista de todas las áreas registradas en el sistema. Soporta paginación.',
        }),

        ApiOkResponse({
            description: 'Lista de áreas disponibles',
            schema: {
                example: [
                    {
                        "id": "57f77483-306a-40b0-800b-7f5bc0ecdbca",
                        "name": "Cordinacion",
                        "universityAdmins": [
                            {
                                "userId": "d64349b9-59e7-4319-8dcc-57a93f2a3a57",
                                "email": "hola2@gmail.com",
                                "gender": "masculino",
                                "lastName": "Gomez",
                                "names": "Damin",
                                "secondLastName": "Morales",
                                "userRole": "university admin",
                                "adminRole": "director"
                            }
                        ]
                    },
                    {
                        "id": "07784ec5-90e2-41ea-9a00-d26b1501d0e3",
                        "name": "Ingenieria",
                        "universityAdmins": []
                    }
                ],
            },
        })

    );

}