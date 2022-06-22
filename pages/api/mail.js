// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createTransport } from "nodemailer"

export default (req, res) => {
	const mailer = createTransport({
		host: "asmtp.mail.hostpoint.ch",
		port: 587,
		secure: false, // upgrade later with STARTTLS
		auth: {
			user: "form@rewave.ch",
			pass: "wDzW!s9NKYESvM2Yg87J",
		},
	})

	const data = JSON.parse(req.body)

	mailer.sendMail({
		from: "form@rewave.ch",
		to: "support@rewave.ch",
		text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${
			data.company ?? ""
		}\nMessage: ${data.message}`,
	})

	res.status(200).json({ message: "OK" })
}
