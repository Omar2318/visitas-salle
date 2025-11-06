import { CreateUserOptions } from "src/common/interfaces";

export type UpdateUserOptions = Partial<CreateUserOptions> & {
    userId: string;
    password?: string;
};