import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserError } from "./user.error";
import { UnauthorizedError } from "./unauthorized.error";
import { NotFoundError } from "./nof-found.error";
import { ForbiddenError } from "./forbidden.error";

export class HandleError {
    static throw(error: any): never {
        
        if (error instanceof UserError) {
            throw new BadRequestException(error.message);
        }

        if(error instanceof UnauthorizedError){
          
            throw new UnauthorizedException(error.message);
        }

        if(error instanceof NotFoundError){
            
            throw new NotFoundException(error.message);
        }

        if(error instanceof ForbiddenError){
            throw new ForbiddenException(error.message);
        }

        console.error(error);
        throw new InternalServerErrorException('Please check server logs');
    }
}
