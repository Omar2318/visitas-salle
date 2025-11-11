import { applyDecorators } from "@nestjs/common";
import { ApiCookieAuth, ApiForbiddenResponse, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger/dist/decorators";

export function AuthRouteDoc() {

    return applyDecorators(

        ApiCookieAuth('token'),
        ApiUnauthorizedResponse({

            description: 'Token invalido o sin token',
            example: {
                "message": "Unauthorized",
                "statusCode": 401
            }
        }),

        ApiForbiddenResponse({
            description: 'No tienes el rol para acceder a la ruta',
            example: {
                "message": "User Damian need a valid role: [system admin]",
                "error": "Forbidden",
                "statusCode": 403
            }
        }),

    );

}