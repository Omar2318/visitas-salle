import { UniversityAdmin } from "src/admin-accounts/infrastructure/data/postgres";
import { Helpers } from "src/common/helpers";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @OneToMany(()=> UniversityAdmin, (universityAdmin)=> universityAdmin.area, {onDelete: 'SET NULL'})
    universityAdmins: UniversityAdmin[]

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.name = Helpers.capitalizeWords(this.name);
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}