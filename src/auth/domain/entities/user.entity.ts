import { Gender } from "../enums";

export class UserEntity {


    constructor(
        protected id: string,
        protected names: string,
        protected lastName: string,
        protected secondLastName: string,
        protected email: string,
        protected gender: Gender,
    ){}


}