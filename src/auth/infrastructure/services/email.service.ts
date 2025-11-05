import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer, { Transporter } from 'nodemailer';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
}

@Injectable()
export class EmailService {
    private transporter: Transporter;

    constructor(private readonly configService: ConfigService){

        this.transporter = nodemailer.createTransport({
            service: this.configService.get<string>('MAILER_SERVICE'),
            auth: {
                user: this.configService.get<string>('MAILER_EMAIL'),
                pass: this.configService.get<string>('MAILER_SECRET_KEY')
            }
        });

    }

    public async sendEmail(options: SendMailOptions): Promise<boolean>{

        const {to,subject,htmlBody} = options;

        try{
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
            });
            return true;
        }catch(error){
            return false;
        }
    }




}