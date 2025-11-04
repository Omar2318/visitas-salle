import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserError } from "./user.error";
import { UnauthorizedError } from "./unauthorized.error";

export class HandleError {
    static throw(error: any): never {
        if (error instanceof UserError) {
            throw new BadRequestException(error.message);
        }

        if(error instanceof UnauthorizedError){
          
            throw new UnauthorizedException(error.message);
        }

        console.error(error);
        throw new InternalServerErrorException('Please check server logs');
    }
}
