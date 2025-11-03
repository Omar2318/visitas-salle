import { CreateVisitorInput } from "../inputs";

export interface AuthRepository {
    createVisitor(createVisitorInput: CreateVisitorInput): void;
}

export interface AuthDatasource extends AuthRepository{
    
}