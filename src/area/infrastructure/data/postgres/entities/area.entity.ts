import { Helpers } from "src/common/helpers";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.name = Helpers.capitalizeWords(this.name);
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}