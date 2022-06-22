import React, { useCallback, useEffect, useState } from "react"
import Body from "../components/website/body/body"
import {
	InnerSection,
	Section,
	Input,
	MultilineInput,
	Form,
} from "../styles/styles"
import Button from "../components/button/button"

const useHandleChange = (initial) => {
	const [value, setValue] = useState(initial)
	const handleChange = useCallback((event) => {
		if (event && event.target) {
			setValue(event.target.value)
		} else {
			setValue(event)
		}
	}, [])

	useEffect(() => {
		setValue(initial)
	}, [initial])

	return [value, handleChange]
}

const Contact = () => {
	const [name, setName] = useHandleChange("")
	const [email, setEmail] = useHandleChange("")
	const [company, setCompany] = useHandleChange("")
	const [message, setMessage] = useHandleChange("")

	const _send = async (e) => {
		e.preventDefault()

		const result = await fetch("/api/mail", {
			method: "POST",
			body: JSON.stringify({ name, email, company, message }),
		})
		if (result) {
			alert("Your message was received!")
			setName("")
			setEmail("")
			setCompany("")
			setMessage("")
		}
	}

	return (
		<Body>
			<Section
				style={{
					minHeight: "500px",
					backgroundImage: `url("/contact.svg")`,
					alignItems: "center",
				}}
				color="#FF7777"
			>
				<h1>Contact</h1>
			</Section>
			<Section style={{ minHeight: "auto" }}>
				<InnerSection justify="center" align="center">
					<Form onSubmit={_send}>
						<h6>Your Full Name</h6>
						<Input
							placeholder="Max Mustermann"
							onChange={setName}
							value={name}
						/>
						<h6>Your E-Mail</h6>
						<Input
							placeholder="maxmmusterman@email.com"
							onChange={setEmail}
							value={email}
						/>
						<h6>Company</h6>
						<Input
							placeholder="Company"
							onChange={setCompany}
							value={company}
						/>
						<h6>Message</h6>

						<MultilineInput rows="8" onChange={setMessage} value={message} />
						<Button
							disabled={
								name.length === 0 || email.length === 0 || message.length === 0
							}
						>
							SEND
						</Button>
					</Form>
				</InnerSection>
			</Section>
		</Body>
	)
}

export default Contact
