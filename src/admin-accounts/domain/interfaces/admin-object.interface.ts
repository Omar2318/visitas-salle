import { AreaObject } from "src/area/domain/entities";
import { UserObject } from "src/auth/domain/interfaces";
import { UniversityRole } from "../enums";

export interface UniversityAdminObject extends UserObject {
    adminRole: UniversityRole,
    area: AreaObject,
}