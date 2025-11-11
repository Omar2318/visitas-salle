import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthRepositoryImpl } from "src/auth/infrastructure/repository/auth.repository.impl";
import { InternalServerError } from "src/common/errors";
import { EmailService } from "src/common/services";
import { forgotPasswordEmail } from "../email";

@Injectable()
export class ForgotPassword {

    constructor(
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly authRepository: AuthRepositoryImpl
    ) { }

    public async execute(email: string) {
        const user = await this.authRepository.findOneUser({email});

        if(!user) return;
        

        const token = this.jwtService.sign({ userId: user.userId });
        const link = `${this.configService.get<string>('FRONT_URL')}/reset-password?token=${token}`;

        const htmlBody = forgotPasswordEmail(link);

        const isSent = await this.emailService.sendEmail({ to: email, subject: 'Valida tu email', htmlBody });

        if (!isSent) throw new InternalServerError();
    }
}