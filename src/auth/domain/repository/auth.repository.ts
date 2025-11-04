import { UserEntity } from "../entities";
import { CreateVisitorOptions, FindOneUserOptions } from "../interfaces";

export interface AuthRepository {
    createVisitor(createVisitorOptions: CreateVisitorOptions): Promise<UserEntity>; 
    findOneUser(findOneUserOptions: FindOneUserOptions): Promise<UserEntity | null>;
}

export interface AuthDatasource extends AuthRepository{
    
}