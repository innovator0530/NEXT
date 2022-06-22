import React from "react"
import styled from "styled-components"
import { HeaderLink } from "../header/header_style"
import {
	BottomGroup,
	Container,
	FooterLink,
	InnerContainer,
} from "./footer_style"
import Image from "next/image"
import {
	HorizontalGroup,
	TextGrey,
	VerticalGroup,
} from "../../../styles/styles"
import Link from "next/link"

const Footer = () => {
	const goToInstagram = (e) => {
		e.preventDefault()
		console.log("HelloW orld!")
		// window.open(
		// 	"https://www.instagram.com/rewavedistribution/"
		// )
	}
	return (
		<Container>
			<InnerContainer>
				<VerticalGroup align="flex-start" style={{ marginTop: "32px" }}>
					<Image src="/rewave_white.svg" width="147px" height="24px" />
					<p style={{ color: "white", opacity: 0.4, marginTop: "16px" }}>
						Headquartered in Zürich, Switzerland.
					</p>
				</VerticalGroup>
				<VerticalGroup>
					<p style={{ color: "white", alignSelf: "end", marginTop: "40px" }}>
						Support
					</p>
					<FooterLink style={{ textAlign: "right" }}>
						<Link href="mailto:support@rewave.ch">support@rewave.ch</Link>
					</FooterLink>
				</VerticalGroup>
				<VerticalGroup>
					<p
						style={{
							color: "white",
							alignSelf: "end",
							marginTop: "40px",
							textAlign: "right",
						}}
					>
						Navigation
					</p>
					<FooterLink style={{ textAlign: "right" }}>
						<Link href="/">Home</Link>
					</FooterLink>
					<FooterLink style={{ textAlign: "right" }}>
						<Link href="/faq">FAQ &amp; Support</Link>
					</FooterLink>
					<FooterLink style={{ textAlign: "right" }}>
						<Link href="/contact">Contact</Link>
					</FooterLink>
				</VerticalGroup>
				<VerticalGroup>
					<p
						style={{
							textAlign: "right",
							color: "white",
							alignSelf: "end",
							marginTop: "40px",
						}}
					>
						Social Media
					</p>

					<FooterLink style={{ textAlign: "right" }}>
						<a
							target="_blank"
							href="https://www.instagram.com/rewavedistribution/"
						>
							Instagram
						</a>
					</FooterLink>
				</VerticalGroup>

				<BottomGroup
					justify="space-between"
					style={{ gridColumnStart: "span 4" }}
				>
					<HorizontalGroup spacing="10px" justify="space-between">
						<FooterLink style={{ fontSize: "14px" }}>
							<Link href="/privacypolicy">Privacy Policy</Link>
						</FooterLink>
						<FooterLink style={{ fontSize: "14px" }}>
							<Link href="/terms-of-use">Terms of Use</Link>
						</FooterLink>
						<FooterLink style={{ fontSize: "14px" }}>
							<Link href="/anti-fraud-policy">Anti-Fraud Policy</Link>
						</FooterLink>
						<FooterLink style={{ fontSize: "14px" }}>
							<Link href="/imprint">Imprint</Link>
						</FooterLink>
					</HorizontalGroup>
					<p
						style={{
							color: "white",
							opacity: 0.4,
							fontSize: "14px",
							marginTop: "80px",
						}}
					>
						Copyright {new Date().getFullYear()} © J.S. Suisse. All rights
						reserved
					</p>
				</BottomGroup>
			</InnerContainer>
		</Container>
	)
}

export default Footer
