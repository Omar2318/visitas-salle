import { Gender } from "src/common/enums";
import { UserObject } from "../interfaces";
import { UserRole } from "../enums";

export class UserEntity {


    constructor(
        protected _userId: string,
        protected _names: string,
        protected _lastName: string,
        protected _secondLastName: string,
        protected _email: string,
        protected _password: string,
        protected _gender: Gender,
        protected _userRole: UserRole,
        protected _isActive: boolean,
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

    public get role(): string {
        return this._userRole;
    }

    public toObject(): UserObject {
        return {
            userId: this._userId,
            email: this._email,
            gender: this._gender,
            lastName: this._lastName,
            names: this._names,
            secondLastName: this._secondLastName,
            userRole: this._userRole,
        }
    }

    public static fromObject(object: Record<string, any>): UserEntity{
        const {id,names,lastName, secondLastName, email,password, gender, role, isActive} = object;

        return new UserEntity(id,names,lastName,secondLastName,email,password,gender,role, isActive);
    }

}