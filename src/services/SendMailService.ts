import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {

    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, body: string) {

        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreply@nps.com.br>"
        })

        console.log("Sent %s", message.messageId);
        console.log("Preview %s", nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();