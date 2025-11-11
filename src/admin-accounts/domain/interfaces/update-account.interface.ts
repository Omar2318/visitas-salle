import { CreateAdminAccountOptions } from "./create-account.interface";

export type UpdateAccountOptions = Partial<CreateAdminAccountOptions> & {
    userId: string;
}