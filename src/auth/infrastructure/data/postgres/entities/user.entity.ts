import { UserRole } from "src/auth/domain/enums";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Helpers } from "src/common/helpers";
import { Gender } from "src/common/enums";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {nullable: false})
    password: string;

    @Column('text')
    names: string;

    @Column()
    lastName: string;

    @Column()
    secondLastName: string;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column('boolean', {
        default: true
    })
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.password = bcrypt.hashSync(this.password, 10);
        this.names = Helpers.capitalizeWords(this.names);
        this.lastName = Helpers.capitalizeWords(this.lastName);
        this.secondLastName = Helpers.capitalizeWords(this.secondLastName);
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }



}
