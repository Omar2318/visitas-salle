import { CreateUserOptions } from "src/common/interfaces";

export interface CreateVisitorOptions extends CreateUserOptions{
    password: string;
    phoneNumber: string;
    birthDate: Date;
}