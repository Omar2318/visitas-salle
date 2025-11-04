import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>User, {cascade: true, nullable: false})
    @JoinColumn()
    user: User;

    @Column({unique: true})
    phoneNumber: string;

    @Column({type:'date'})
    birthDate: Date;

    @Column('boolean', {default: false})
    emailVerified: boolean;

    @Column({nullable: true})
    ineImageName?: string;
}