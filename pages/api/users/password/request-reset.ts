import { sendPasswordResetEmail, sendVerificationEmail } from "@lib/email/sendVerificationEmail";
import { generateVerficationToken } from "@lib/password";
import { RequestWithSession } from "@middleware/nextAuthApi";
import { NextApiResponse } from "next";
import { createHandler } from "../../../../middleware";
import User from "../../../../models/database/user";

const handler = createHandler()

// PUT /api/users/password/request-reset
// Sends User a verification email with password reset token
// If called by an admin, User is forced to reset the password

handler.put(async (req: RequestWithSession, res: NextApiResponse) => {
    try {

        const { email } = req.query;
        if (!email) {
            res.status(400).json({ message: 'No email specified' });
            return;
        }
        const user = await User.findOneByEmail(email as string, { type: 1, email: 1, emailStatus: 1 })
        if (!user) {
            res.status(404).json({ message: 'User Not found' });
            return;
        }
        if (user.type !== 'USER') {
            res.status(400).json({ message: 'Only allowed to request User password reset (Not admins)' });
            return;
        }
        const verificationToken = generateVerficationToken();
        if (user.emailStatus === 'VERIFICATION_NEEDED') {
            await sendVerificationEmail(user.email, verificationToken);
            user.emailVerificationCode = verificationToken;
            await user.save();
            res.status(400).json({ message: 'User must validate his/her E-Mail first. An Email validation link was sent to your email.' });
            return;
        }
        
        await sendPasswordResetEmail(user.email, verificationToken);

        user.emailVerificationCode = verificationToken;
        await user.save();

        res.status(200).json({ message: 'Password Reset Request successful' });
    } catch (e) {
        console.log("Error at requesting password reset:", e);
        res.status(500).json({ errorMessage: e.message });
    }
})

export default handler;