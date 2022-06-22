import { createTransport } from "nodemailer"
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async (toEmail:string, subject:string,content:string,html?:string)=>{
    if(!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_PORT || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD  || !process.env.EMAIL_FROM){
        console.log("ERROR! Please check whether process.env includes EMAIL_SERVER_HOST,EMAIL_SERVER_PORT,EMAIL_SERVER_USER,EMAIL_SERVER_PASSWORD and EMAIL_FROM")
        throw new Error("EMAIL_SERVER_HOST,EMAIL_SERVER_PORT,EMAIL_SERVER_USER,EMAIL_SERVER_PASSWORD or EMAIL_FROM missing");
    }
    const mailer = createTransport({
		host: process.env.EMAIL_SERVER_HOST,//"asmtp.mail.hostpoint.ch",
		// port: parseInt(process.env.EMAIL_SERVER_PORT),//587,
		secure: true, // upgrade later with STARTTLS
		auth: {
			user: process.env.EMAIL_SERVER_USER,//"form@rewave.ch",
			pass: process.env.EMAIL_SERVER_PASSWORD//"wDzW!s9NKYESvM2Yg87J",
		},
	})

	const mail:Mail.Options = {
		from: process.env.EMAIL_FROM,
		to: toEmail,
        subject: subject||'Verify your E-Mail - REWAVE',
		text: content,
	}
	if(html){
		mail.html = html;
	}

    mailer.sendMail(mail)
}