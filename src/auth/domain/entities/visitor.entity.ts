import { Gender } from "src/common/enums";
import { UserEntity } from "./user.entity";

export class VisitorEntity extends UserEntity {

    constructor(
        private _visitorId: string,
        private _phoneNumber: string,
        private _birthDate: Date,
        private _emailVerified: boolean,
        userId: string,
        names: string,
        lastName: string,
        secondLastName: string,
        email: string,
        password: string,
        gender: Gender,
        isActive: boolean,
        private _ineImageName?: string

    ){
        super(userId,names,lastName,secondLastName,email,password,gender, isActive);
    }

    public get visitorId(){
        return this._visitorId;
    }

    static fromObject(object: Record<string, any>){
        const {id:visitorId, user,phoneNumber, birthDate, emailVerified, ineImageName} = object;

        const {id:userId,email,password,names,lastName,secondLastName,gender,isActive,role} = user;
        
        return new VisitorEntity(visitorId, phoneNumber, birthDate, emailVerified, userId, names, lastName, secondLastName, email, password, gender, isActive,ineImageName);
        
    }

}