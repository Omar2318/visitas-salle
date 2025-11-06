import { Gender } from "../enums";

export interface CreateUserOptions {
    names: string;
    lastName: string;
    secondLastName: string;
    email: string;
    gender: Gender;
}