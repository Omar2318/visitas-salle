import { Gender, UserRole } from "src/auth/domain/enums";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
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
        this.names = this.capitalizeWords(this.names);
        this.lastName = this.capitalizeWords(this.lastName);
        this.secondLastName = this.capitalizeWords(this.secondLastName);
    }

    private capitalizeWords(text: string): string {
        if (!text) return '';

        return text
            .trim() 
            .split(/\s+/) 
            .map(word =>
                word.charAt(0).toLocaleUpperCase('es') + word.slice(1).toLocaleLowerCase('es')
            )
            .join(' ');
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
