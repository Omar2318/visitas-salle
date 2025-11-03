import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UniversityRole } from "src/auth/domain/enums";

@Entity()
export class UniversityAdmin {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(()=>User, {cascade: true})
    @JoinColumn()
    user: User;

    @Column({type: 'enum', enum: UniversityRole})
    role: UniversityRole;

    
}