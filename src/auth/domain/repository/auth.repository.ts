import { UserEntity } from "../entities";
import { VisitorEntity } from "../entities/visitor.entity";
import { CreateVisitorOptions, FindOneUserOptions, UpdateUserOptions } from "../interfaces";

export interface AuthRepository {
    createVisitor(createVisitorOptions: CreateVisitorOptions): Promise<VisitorEntity>; 
    findOneUser(findOneUserOptions: FindOneUserOptions): Promise<UserEntity | null>;
    updateUser(updateUserOptions: UpdateUserOptions): Promise<UserEntity | null>;
    validateEmail(visitorId: string): Promise<boolean>;
}

export interface AuthDatasource extends AuthRepository{
    
}