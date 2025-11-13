import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { SystemAdmin } from "./system-admin.entity";

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>User, {cascade: true, nullable: false, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @Column()
    phoneNumber: string;

    @Column({type:'date'})
    birthDate: Date;

    @Column('boolean', {default: false})
    emailVerified: boolean;

    @Column({nullable: true})
    ineImageName?: string;
}