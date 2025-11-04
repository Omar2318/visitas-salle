import { Gender } from "../enums";

export class UserEntity {


    constructor(
        protected _id: string,
        protected _names: string,
        protected _lastName: string,
        protected _secondLastName: string,
        protected _email: string,
        protected _password: string,
        protected _gender: Gender,
    ){}

    public get id(): string{
        return this._id;
    }

    public get password(): string{
        return this._password;
    }

    public static fromObject(object: Record<string, any>): UserEntity{
        const {id,names,lastName, secondLastName, email,password, gender} = object;

        return new UserEntity(id,names,lastName,secondLastName,email,password,gender);
    }

}