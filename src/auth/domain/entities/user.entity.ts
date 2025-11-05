import { Gender } from "../enums";

export class UserEntity {


    constructor(
        protected _userId: string,
        protected _names: string,
        protected _lastName: string,
        protected _secondLastName: string,
        protected _email: string,
        protected _password: string,
        protected _gender: Gender,
    ){}

    public get userId(): string{
        return this._userId;
    }

    public get password(): string{
        return this._password;
    }

    public get email(): string{
        return this._email;
    }

    public static fromObject(object: Record<string, any>): UserEntity{
        const {id,names,lastName, secondLastName, email,password, gender} = object;

        return new UserEntity(id,names,lastName,secondLastName,email,password,gender);
    }

}