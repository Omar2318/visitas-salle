import { Injectable } from "@nestjs/common";
import { AdminAccountsRepositoryImpl } from "src/admin-accounts/infrastructure/repository/admin-accounts.impl";
import { CreateAdminAccountInput } from "../inputs";
import { UserError } from "src/common/errors";
import { EmailService } from "src/common/services";
import { AuthService } from "src/auth/presentation/auth.service";
import { AreaRepositoryImpl } from "src/area/infrastructure/repository/area.repository.impl";

@Injectable()
export class CreateAdminAccount {
    constructor(
        private readonly adminAccountRepo: AdminAccountsRepositoryImpl,
        private readonly areaRepo: AreaRepositoryImpl,
        private readonly authService: AuthService,
    ) { }

    public async execute(createAccountInput: CreateAdminAccountInput) {
        const area = await this.areaRepo.getArea(createAccountInput.areaId);

        if (!area) throw new UserError('El area no existe');

        const newAdmin = await this.adminAccountRepo.createAccount(createAccountInput);

        await this.authService.forgotPassword(newAdmin.email);

    }

}