import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import {
	InnerSection,
	VerticalGroup,
	VerticalSection,
} from "../../../styles/styles"
import Button from "../../button/button"
import { Spotify, Youtube, Apple, Tidal, Tiktok, Insta } from "./intro_style"

const Intro = () => {
	return (
		<>
			<VerticalSection>
				<h1>
					Publish Your Music.
					<br /> Everywhere.
					<br /> For Free.
				</h1>
				<h3 style={{ opacity: 0.8 }}>
					Distribute your music to major streaming platforms.
				</h3>
				<Link href="/login">
					<Button
						style={{
							marginTop: "20px",
						}}
					>
						REGISTER NOW
					</Button>
				</Link>
			</VerticalSection>
			<Youtube>
				<img src="/youtube.svg" width="80%" height="80%" />
			</Youtube>
			<Spotify>
				<img src="/spotify.svg" width="65%" height="65%" />
			</Spotify>
			<Apple>
				<img src="/deezer.svg" width="80%" height="80%" />
			</Apple>
			<Tidal>
				<img src="/tidal.svg" width="80%" height="80%" />
			</Tidal>
			<Tiktok>
				<img src="/apple.svg" width="70%" height="70%" />
			</Tiktok>
			<Insta>
				<img src="/insta.svg" width="50%" height="50%" />
			</Insta>
		</>
	)
}

export default Intro
