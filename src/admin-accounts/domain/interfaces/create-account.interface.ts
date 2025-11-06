import { CreateUserOptions } from "src/common/interfaces";
import { UniversityRole } from "../enums";

export interface CreateAdminAccountOptions extends CreateUserOptions{
    role: UniversityRole;
    areaId: string;
}