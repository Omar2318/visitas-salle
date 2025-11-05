import { CreateUserOptions } from "src/common/interfaces";

export interface CreateVisitorOptions extends CreateUserOptions{
    phoneNumber: string;
    birthDate: Date;
}