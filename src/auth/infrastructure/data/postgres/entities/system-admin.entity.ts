import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class SystemAdmin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(()=> User, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    
}