import { Gender } from "../enums";
import { UserEntity } from "./user.entity";

export class VisitorEntity extends UserEntity {

    constructor(
        private visitorId: string,
        private phoneNumber: string,
        private birthDate: Date,
        private emailVerified: boolean,
        userId: string,
        names: string,
        lastName: string,
        secondLastName: string,
        email: string,
        gender: Gender,
        private ineImageName?: string

    ){
        super(userId,names,lastName,secondLastName,email,gender);
    }

    static fromObject(object: Record<string, any>){
        const {visitorId, phoneNumber, birthDate, emailVerified, userId, names, lastName, secondLastName, email, gender, ineImageName} = object;

        return new VisitorEntity(visitorId, phoneNumber, birthDate, emailVerified, userId, names, lastName, secondLastName, email, gender, ineImageName);
        
    }

}