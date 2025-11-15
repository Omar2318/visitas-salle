import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateScheduleOptions, ScheduleInterface, UpdateScheduleOptions } from "src/schedules/domain/interfaces";
import { ScheduleDatasource } from "src/schedules/domain/repository/schedule.repository";
import { Schedule } from "../data/postgres";
import { Repository } from "typeorm";
import { UserError } from "src/common/errors";

@Injectable()
export class PostgresScheduleDs implements ScheduleDatasource {

    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ) { }

    public async create(universityAdminId: string, createScheduleOptions: CreateScheduleOptions[]): Promise<void> {



        const schedules = createScheduleOptions.map((newSchedule) =>
            this.scheduleRepository.create({
                universityAdmin: { id: universityAdminId },
                ...newSchedule
            })
        );

        await this.scheduleRepository.save(schedules);
    }

    public async findOne(universityAdminId: string): Promise<ScheduleInterface[]> {

        return await this.scheduleRepository
            .createQueryBuilder('s')
            .select([
                's.id AS "id"',
                `to_char(s.startTime, 'HH24:MI') AS "startTime"`,
                `to_char(s.endTime, 'HH24:MI') AS "endTime"`,
                's.dayOfWeek AS "dayOfWeek"'
            ])
            .where('s.universityAdminId = :id', { id: universityAdminId })
            .getRawMany();

    }

    public async remove(universityAdminId: string): Promise<boolean> {

        const deletedResults = await this.scheduleRepository.delete({
            universityAdmin: { id: universityAdminId }
        })

        if (deletedResults.affected === 0) return false;

        return true;
    }

    public async update(universityAdminId: string, updateScheduleOptions: UpdateScheduleOptions[]): Promise<void> {
        await this.remove(universityAdminId);
        await this.create(universityAdminId, updateScheduleOptions);
    }
}