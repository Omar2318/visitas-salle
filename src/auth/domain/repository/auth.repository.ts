import { UserEntity } from "../entities";
import { CreateVisitorInput } from "../inputs";

export interface AuthRepository {
    createVisitor(createVisitorInput: CreateVisitorInput): Promise<UserEntity>; 
}

export interface AuthDatasource extends AuthRepository{
    
}