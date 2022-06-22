import { getEmailBodyFromTemplate } from "./emailTemplate";
import { sendEmail } from "./sendEmail";
const verificationLinkBaseUrl = process.env.EMAIL_VERIFICATION_LINK_HOST;
const VERIFICATION_EMAIL_SUBJECT = "Verify your E-Mail - REWAVE"
const PASSWORD_RESET_EMAIL_SUBJECT = "Reset your password - REWAVE"

export const sendVerificationEmail = async (email:string, verificationCode:string)=>{
    const url = `${verificationLinkBaseUrl}/verify-email?token=${verificationCode}&email=${email}`;
    const emailHtml = getEmailBodyFromTemplate(VERIFICATION_EMAIL_SUBJECT,"Verify your email address",url,"Verify Email Address");
    const emailText = `Please verify your E-Mail at ${url}`
    console.log("Sending verification email")
    await sendEmail(email,VERIFICATION_EMAIL_SUBJECT,emailText,emailHtml);
}

export const sendPasswordResetEmail = async (email:string, verificationCode:string)=>{
    const url = `${verificationLinkBaseUrl}/reset-password?token=${verificationCode}&email=${email}`;
    const emailHtml = getEmailBodyFromTemplate(PASSWORD_RESET_EMAIL_SUBJECT,"Reset your password",url,"Reset password");
    const emailText = `Please reset your password at ${url}`
    await sendEmail(email,PASSWORD_RESET_EMAIL_SUBJECT,emailText,emailHtml);
}