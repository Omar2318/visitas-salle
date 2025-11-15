import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UniversityAdmin } from "src/admin-accounts/infrastructure/data/postgres";
import { DayOfWeek } from "src/schedules/domain/enums";

@Entity()
export class Schedule {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(()=> UniversityAdmin, (universityAdmin) => universityAdmin.schedule, {onDelete: 'CASCADE'})
    universityAdmin: UniversityAdmin;
    
    @Column('time')
    startTime: string;

    @Column('time')
    endTime: string;

    @Column('enum',{enum: DayOfWeek})
    dayOfWeek: DayOfWeek;

}