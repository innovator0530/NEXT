import React, { useState } from "react"
import styled from "styled-components"
import Body from "../components/website/body/body"
import Button from "../components/button/button"
import {
	InnerSection,
	Section,
	VerticalGroup,
	VerticalSection,
} from "../styles/styles"
import Image from "next/image"
import Question from "../components/website/question/question"
import { faqData } from "../utils/faqData"
import { useRouter } from "next/router"
import { supportSiteLink } from "../config"

const Faq = () => {
	const [openIndex, setOpenIndex] = useState(-1)
	const router = useRouter()
	return (
		<Body>
			<Section
				style={{
					minHeight: "500px",
					backgroundImage: `url("/faq_header.svg")`,
					alignItems: "center",
				}}
				color="#3C9570"
			>
				<h1>FAQ & Support</h1>
			</Section>
			<Section style={{ minHeight: "auto" }}>
				<InnerSection justify="center">
					<VerticalGroup align="center">
						<h2>Frequently Asked Questions</h2>
						<div style={{ maxWidth: "510px", marginTop: "20px" }}>
							{faqData.map((item, i) => (
								<Question
									key={i}
									question={item.question}
									answer={item.answer}
									open={openIndex === i}
									onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
								/>
							))}
						</div>
					</VerticalGroup>
				</InnerSection>
			</Section>
			<Section
				color="#125450"
				style={{
					minHeight: "350px",
					backgroundImage: `url("/faq_bottom.svg")`,
					alignItems: "center",
				}}
			>
				<VerticalSection style={{ alignItems: "center" }}>
					<h2 style={{ color: "#A0FFF9" }}>More Questions ?</h2>
					<a href={supportSiteLink} target="_blank">
					<Button
						style={{ backgroundColor: "#A0FFF9", color: "#125450" }}
						onCLick={() => router.push("/contact")}
					>
						FIND YOUR ANSWERS
					</Button>
					</a>
				</VerticalSection>
			</Section>
		</Body>
	)
}

export default Faq
