import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function FindAllSecEmDoc() {

    return applyDecorators(

        ApiOkResponse({
            example: [
                {
                    "id": "caf55b43-c7f4-45b5-b163-ae35a1f9206d",
                    "email": "tidac32136@canvect.com"
                }
            ]
        })

    );

}