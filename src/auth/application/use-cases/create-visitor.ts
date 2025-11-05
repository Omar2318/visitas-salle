import { Injectable } from "@nestjs/common";
import { AuthRepositoryImpl } from '../../infrastructure/repository/auth.repository.impl';
import { UserEntity } from "src/auth/domain/entities";
import { CreateVisitorInput } from "../inputs";
import { EmailService } from "src/auth/infrastructure/services";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InternalServerError } from "src/common/errors";
import { VisitorEntity } from "src/auth/domain/entities/visitor.entity";

@Injectable()
export class CreateVisitor {

    constructor(
        private readonly authRepository: AuthRepositoryImpl,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
        private readonly jwtService : JwtService,
    ){}

    public async execute(createVisitorInput: CreateVisitorInput): Promise<VisitorEntity>{
        const newVisitor = await this.authRepository.createVisitor(createVisitorInput);
        
        await this.sendEmailValidationLink(newVisitor.visitorId, newVisitor.email);
        return newVisitor;
    }

    private async sendEmailValidationLink(visitorId: string, email: string){
        const token = this.jwtService.sign({visitorId});
        const link = `${this.configService.get<string>('WEBSERVICE_URL')}/api/auth/validate-email/${token}`;
        const htmlBody = `<a href="${ link }">Valida tu email</a>`;
       
        const isSent = await this.emailService.sendEmail({to: email, subject: 'Valida tu email', htmlBody});

        if ( !isSent ) throw new InternalServerError();

    }

}