import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/infrastructure/data/postgres";
import { UniversityRole } from "src/admin-accounts/domain/enums";
import { Area } from "src/area/infrastructure/data/postgres";
import { Schedule } from "../../../../../schedules/infrastructure/data/postgres/entities/schedule.entity";

@Entity()
export class UniversityAdmin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=>User, {cascade: true, nullable: false, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @ManyToOne(()=>Area, (area)=> area.universityAdmins, {onDelete: 'SET NULL'})
    area: Area;

    @OneToMany(()=> Schedule, (schedule)=> schedule.universityAdmin)
    schedule: Schedule[];

    @Column({type: 'enum', enum: UniversityRole})
    role: UniversityRole;

    
}