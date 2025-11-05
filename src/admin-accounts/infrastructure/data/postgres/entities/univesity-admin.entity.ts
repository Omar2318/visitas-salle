import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/infrastructure/data/postgres";
import { UniversityRole } from "src/admin-accounts/domain/enums";

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