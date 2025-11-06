import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/infrastructure/data/postgres";
import { UniversityRole } from "src/admin-accounts/domain/enums";
import { Area } from "src/area/infrastructure/data/postgres";

@Entity()
export class UniversityAdmin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>User, {cascade: true, nullable: false, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @ManyToOne(()=>Area, (area)=> area.universityAdmins)
    area: Area;

    @Column({type: 'enum', enum: UniversityRole})
    role: UniversityRole;

    
}