import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/domain/entities";
import { User, Visitor } from "../data/postgres";
import { Repository } from "typeorm";
import { AuthDatasource } from "src/auth/domain/repository/auth.repository";
import { UserRole } from "src/auth/domain/enums";
import { InternalServerError, UserError } from "src/common/errors";
import { CreateVisitorOptions, FindOneUserOptions, UpdateUserOptions } from "src/auth/domain/interfaces";
import { VisitorEntity } from "src/auth/domain/entities/visitor.entity";

@Injectable()
export class PostgresAuthDatasource implements AuthDatasource {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Visitor)
        private readonly visitorRepository: Repository<Visitor>
    ) { }

    private handleError(error: any): never {
        if (error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') {
            throw new UserError('El email ya esta registrado');
        }

        throw new InternalServerError();

    }

    public async createVisitor(createVisitorOptions: CreateVisitorOptions): Promise<VisitorEntity> {
        try {
            const { phoneNumber, birthDate } = createVisitorOptions;

            const newVisitor = this.visitorRepository.create({
                birthDate,
                phoneNumber,
                user: { ...createVisitorOptions, role: UserRole.Visitor }
            });

            const visitor = await this.visitorRepository.save(newVisitor);


            return VisitorEntity.fromObject(visitor);

        } catch (error) {
            this.handleError(error);
        }
    }

    public async findOneUser(findOneUserOptions: FindOneUserOptions): Promise<UserEntity | null> {
        const { id, email } = findOneUserOptions;

        if (!id && !email) {
            return null; 
        }
        const where: any = {};

        if (id) {
            where.id = id;
        } else if (email) {
            where.email = email;
        }

        const usuario = await this.userRepository.findOne({
            relations: { visitor: true },
            where
        });

        if (!usuario) return null;

        if (usuario.visitor) {
            const object = { ...usuario.visitor, user: usuario }
            return VisitorEntity.fromObject(object);
        }

        return UserEntity.fromObject(usuario);
    }

    public async validateEmail(visitorId: string): Promise<boolean> {
        const visitor = await this.visitorRepository.findOneBy({ id: visitorId });
        if (!visitor) return false;
        if (visitor.emailVerified) return false;
        visitor.emailVerified = true;

        await this.visitorRepository.save(visitor);

        return true;
    }

    public async updateUser(updateUserOptions: UpdateUserOptions): Promise<UserEntity | null> {
        const { userId } = updateUserOptions;

        const updateUser = await this.userRepository.preload({
            id: userId,
            ...updateUserOptions
        });

        if (!updateUser) return null;

        const updatedUser = await this.userRepository.save(updateUser);

        return UserEntity.fromObject(updatedUser);

    }
}