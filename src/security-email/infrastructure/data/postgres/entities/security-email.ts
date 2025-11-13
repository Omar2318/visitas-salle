import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SecurityEmail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({unique: true})
    email: string;
}