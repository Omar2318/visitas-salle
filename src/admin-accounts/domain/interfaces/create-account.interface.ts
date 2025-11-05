import { CreateUserOptions } from "src/common/interfaces";
import { UniversityRole } from "../enums";

export interface CreateAccountOptions extends CreateUserOptions{
    rol: UniversityRole;
    areaId: string;
}