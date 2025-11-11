import { Gender } from "src/common/enums";
import { UserRole } from "../enums";

export interface UserObject {
    names: string,
    lastName: string,
    secondLastName: string,
    email: string,
    gender: Gender,
    userRole: UserRole,

}