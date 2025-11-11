import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdminAccountOptions, UniversityAdminObject, UpdateAccountOptions } from "src/admin-accounts/domain/interfaces";
import { AdminAccountsDatasource } from "src/admin-accounts/domain/repository/admin-accounts.repository";
import { UniversityAdmin } from "../data/postgres";
import { Repository } from "typeorm";
import { UserRole } from "src/auth/domain/enums";
import { Area } from "src/area/infrastructure/data/postgres";
import { InternalServerError, UserError } from "src/common/errors";
import { v4 as uuid } from 'uuid';
import { AreaEntity } from "src/area/domain/entities";
import { UniversityAdminEntity } from "src/admin-accounts/domain/entities";
import { PaginationOptions } from "src/common/interfaces";
import { FindAdminsInput } from "src/admin-accounts/application/inputs";


@Injectable()
export class PostgresAdminAccountsDatasource implements AdminAccountsDatasource {

    constructor(
        @InjectRepository(UniversityAdmin)
        private readonly universityAdminRepo: Repository<UniversityAdmin>,
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ) { }

    private handleError(error): never {
        if (error.constraint === 'UQ_e12875dfb3b1d92d7d7c5377e22') throw new UserError('El email ya esta registrado');
        console.log(error);
        throw new InternalServerError();
    }

    public async createAccount(createAccountOptions: CreateAdminAccountOptions): Promise<UniversityAdminEntity> {

        const { role, areaId } = createAccountOptions;
        try {

            const newAdmin = this.universityAdminRepo.create({
                role,
                area: { id: areaId },
                user: {
                    ...createAccountOptions,
                    role: UserRole.UniversityAdmin,
                    password: uuid(),
                }
            });

            await this.universityAdminRepo.save(newAdmin);

            return UniversityAdminEntity.fromObject(newAdmin);

        } catch (error) {
            this.handleError(error);

        }

    }

    public async findAllByPagination(findAdminsInput: FindAdminsInput): Promise<UniversityAdminObject[]> {
        const { limit = 5, page = 0, search } = findAdminsInput;

        const query = this.universityAdminRepo
            .createQueryBuilder('ad')
            .leftJoinAndSelect('ad.area', 'area')
            .leftJoinAndSelect('ad.user', 'u')
            .orderBy('area.name', 'ASC')
            .take(limit)
            .skip(page * limit);

        if (search) {
            query.andWhere(
                `CONCAT(u.names, ' ', u."lastName", ' ', u."secondLastName") ILIKE :search`,
                { search: `%${search}%` }
            );
        }

        const admins = await query.getMany();


        return admins.map(admin => UniversityAdminEntity.fromObject(admin).toObject());
    }

    public async findOne(userId: string): Promise<UniversityAdminEntity | null> {
        const admin = await this.universityAdminRepo.findOne({
            relations: {user: true, area: true},
            where: { user: {id: userId}},
        });

        return admin ? UniversityAdminEntity.fromObject(admin) : null;
        
    }

    public async updateAccount(updateAccountOptions: UpdateAccountOptions): Promise<UniversityAdminEntity | null> {
        const {userId} = updateAccountOptions
        
        const admin = await this.universityAdminRepo.findOne({
            relations: {user: true, area: true},
            where: {user: {id: userId}},
        });

        if(!admin) return null;
        //console.log(admin);
        const newAdmin = {...admin, ...updateAccountOptions};

        return null;
    }

}