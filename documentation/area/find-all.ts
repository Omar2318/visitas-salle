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
                        id: '57f77483-306a-40b0-800b-7f5bc0ecdbca',
                        name: 'Coordinación',
                    },
                    {
                        id: 'ad0f3964-5094-4c59-afc9-f6855415e9a4',
                        name: 'Comunicación',
                    },
                ],
            },
        })

    );

}