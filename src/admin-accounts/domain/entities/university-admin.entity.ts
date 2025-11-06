import { UserEntity } from "src/auth/domain/entities";
import { Gender } from "src/common/enums";
import { UniversityRole } from "../enums";
import { AreaEntity } from "src/area/domain/entities";

export class UniversityAdminEntity extends UserEntity {

    constructor(
        userId: string,
        names: string,
        lastName: string,
        secondLastName: string,
        email: string,
        password: string,
        gender: Gender,
        isActive: boolean,
        private _role: UniversityRole,
        private _adminId: string,
        private _area: AreaEntity,
    ) {
        super(userId,names,lastName,secondLastName,email,password,gender, isActive);
    }

    public static fromObject(object: Record<string, any>): UniversityAdminEntity {

        const {id: adminId, user, role, area} = object;
        const {id: userId, email, password, names, lastName, secondLastName, gender,isActive} = user;
        const objectArea = AreaEntity.fromObject(area);

        return new UniversityAdminEntity(userId, names, lastName, secondLastName, email, password, gender, isActive,role, adminId, objectArea);
    }

}