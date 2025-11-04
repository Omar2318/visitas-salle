import { Gender } from "src/auth/domain/enums";

export interface CreateVisitorInput {
    names: string;
    lastName: string;
    secondLastName: string;
    email: string;
    password: string;
    gender: Gender;
    phoneNumber: string;
    birthDate: Date;
}