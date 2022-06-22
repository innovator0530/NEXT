import Head from "next/head"
import styles from "../styles/Home.module.css"
import Body from "../components/website/body/body"
import {
	Section,
	DarkGrey,
	DarkBlue,
	Independent,
	VerticalGroup,
	Speed,
	Pricing,
	Paid,
	InnerSection,
} from "../styles/styles"
import Button from "../components/button/button"
import Image from "next/image"
import Distribution from "../components/website/distribution/distribution"
import Intro from "../components/website/intro/intro"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Home() {
	const [isSmartphone, setIsSmartphone] = useState(false)
	useEffect(() => {
		const set = () => {
			if (window.innerWidth < 801) {
				setIsSmartphone(true)
			} else {
				setIsSmartphone(false)
			}
		}

		set()
		window.addEventListener("resize", set)

		return () => {
			window.removeEventListener("resize", set)
		}
	}, [])

	return (
		<Body>
			<Section color={DarkGrey}>
				<Intro />
			</Section>

			<Section style={{ minHeight: "800px" }} color="#141414">
				<Distribution />
			</Section>

			<Section
				color="#1A232E"
				style={{
					minHeight: "initial",
					padding: "200px 0",
				}}
			>
				<InnerSection reverse>
					<Paid>
						<Image
							src="/paid.svg"
							layout="responsive"
							width="401"
							height="220"
						/>
					</Paid>
					<VerticalGroup style={{ maxWidth: isSmartphone ? "100%" : "50%" }}>
						<h2>Get Paid</h2>
						<h4>
							Every time your music gets streamed you earn money. Get paid
							monthly through PayPal or TWINT (Switzerland). There is no payout
							threshold.
						</h4>
					</VerticalGroup>
				</InnerSection>
			</Section>

			<Section
				color="#1A232E"
				style={{
					minHeight: "initial",
					padding: "200px 0",
				}}
			>
				<InnerSection>
					<VerticalGroup style={{ maxWidth: isSmartphone ? "100%" : "60%" }}>
						<h2>Pricing</h2>
						<h4>
							We collect a 10% split of the revenue you generate. This is how we
							earn money and can keep our distribution service for free. You
							keep 90%, with the freedom to leave whenever you want. <br />
							<br />
							No credit card details will be required, as we do not have any
							additional fees.
						</h4>
					</VerticalGroup>
					<Pricing>
						<Image
							src="/pricing.svg"
							layout="responsive"
							width="442"
							height="518"
						/>
					</Pricing>
				</InnerSection>
			</Section>

			<Section style={{ minHeight: "70vh" }}>
				<InnerSection>
					<VerticalGroup style={{ maxWidth: isSmartphone ? "100%" : "50%" }}>
						<h2>Be Independent</h2>
						<h4>
							As an independent artist, you have complete control over your
							music: You have full control over distribution, marketing,
							artwork, deadlines, and more. This frees you from confusing
							contracts, expensive lawyers, and copyright issues.
						</h4>
					</VerticalGroup>
				</InnerSection>
				<Independent>
					<Image src="/independent.svg" layout="fill" />
				</Independent>
			</Section>

			<Section color="#B2F1FF" style={{ minHeight: "70vh" }}>
				<InnerSection justify="flex-end">
					<VerticalGroup
						style={{
							maxWidth: isSmartphone ? "100%" : "50%",
							zIndex: 2,
						}}
						align="flex-start"
					>
						<h2 style={{ color: DarkBlue }}>Speed</h2>
						<h4 style={{ color: DarkBlue }}>
							One of REWAVE’s top priorities is execution speed. As a music
							distributor we value efficiency and therefore put effort into
							minimizing the artist’s waiting time.
						</h4>
						
						<Button
							style={{
								backgroundColor: DarkBlue,
								color: "#B2F1FF",
								fontSize: isSmartphone ? "14px" : "18px",
								marginTop: "30px",
								padding:'0'
							}}
						>
							<Link href="/login">
								<div style={{padding:'12px 40px'}}>REGISTER NOW</div>
							</Link>
						</Button>
					</VerticalGroup>
				</InnerSection>
				<Speed>
					<Image src="/speed.svg" layout="fill" />
				</Speed>
			</Section>
			
		</Body>
	)
}
