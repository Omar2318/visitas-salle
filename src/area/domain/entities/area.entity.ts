import { UniversityAdminEntity } from "src/admin-accounts/domain/entities";
import { UniversityAdminObject } from "src/admin-accounts/domain/interfaces";

export interface AreaObject {
    id: string;
    name: string;
    universityAdmins?: (UniversityAdminObject | null)[];
}

export class AreaEntity {

    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _universityAdmins?: UniversityAdminEntity[],
    ) { }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public toObject(): AreaObject {

        const admins = this._universityAdmins ? this._universityAdmins.map(admin => admin ? admin.toObject() : null) : undefined;

        return {
            id: this._id,
            name: this._name,
            universityAdmins: admins,
        }
    }

    public static fromObject(object: Record<string, any>) {
        const { id, name, universityAdmins } = object;

        let admins;
        if (universityAdmins) {
            admins = universityAdmins.map(ad => {
                if (ad) {
                    return UniversityAdminEntity.fromObject(ad);
                }
            });
        }

        return new AreaEntity(id, name, admins);
    }

}