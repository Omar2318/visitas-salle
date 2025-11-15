import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function FindOneDoc() {

    return applyDecorators(

        ApiOperation({
            summary: 'Obtener área por ID',
            description: 'Busca un área por su identificador UUID.',
        }),
        ApiOkResponse({
            description: 'Área encontrada correctamente',
            schema: {
                example: {
                    "id": "ad0f3964-5094-4c59-afc9-f6855415e9a4",
                    "name": "Comunicacion",
                    "universityAdmins": [
                        {
                            "userId": "7a79c895-40ee-40e1-adfa-95e0202e453f",
                            "email": "aasd@gmail.com",
                            "gender": "masculino",
                            "lastName": "Martinez",
                            "names": "Jorge",
                            "secondLastName": "Morales",
                            "adminRole": "coordinador"
                        },
                        {
                            "userId": "01bb4836-b381-4aba-ba67-b6e37a77eb0d",
                            "email": "omar.ramires098145@gmail.com",
                            "gender": "masculino",
                            "lastName": "Martinez",
                            "names": "Diego",
                            "secondLastName": "Morales",
                            "adminRole": "coordinador"
                        }
                    ]
                },
            },
        }),
        ApiBadRequestResponse({
            description: 'ID inválido',
            schema: {
                example: {
                    "message": "Validation failed (uuid is expected)",
                    "error": "Bad Request",
                    "statusCode": 400
                }
            },
        }),
        ApiNotFoundResponse({
            description: 'Área no encontrada',
            schema: {
                example: {
                    message: 'Área no encontrada',
                    error: 'Not Found',
                    statusCode: 404,
                },
            },
        })
    );

}