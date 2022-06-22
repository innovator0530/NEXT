import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { HorizontalGroup, MobileOnly } from "../../../styles/styles"
import {
	Container,
	HeaderLink,
	ResponsiveHorizontalGroup,
	HeaderContent,
	Links,
	InnerContainer,
} from "./header_style"
import Button from "../../button/button"
import { useRouter } from "next/router"
import { GreyButton } from "../../button/button_style"
import Image from "next/image"
import Link from "next/link"
import { map_numbers } from "../../../utils/math"

const Header = () => {
	const { pathname } = useRouter()
	const [backgroundOn, setBackgroundOn] = useState(0)
	const [isMenuVisible, setIsVisibleMenu] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 90) {
				setBackgroundOn(
					Math.min(map_numbers(window.scrollY, 90, 100, 0, 0.9), 0.9)
				)
			} else {
				setBackgroundOn(0)
			}
		}

		window.addEventListener("scroll", onScroll)

		return () => window.removeEventListener("scroll", onScroll)
	})

	return (
		<Container
			style={{
				backgroundColor: `rgba(30, 30, 29 , ${
					isMenuVisible ? 1 : backgroundOn
				})`,
			}}
		>
			<InnerContainer isMenuVisible={isMenuVisible}>
				<MobileOnly
					style={{
						backgroundImage: "url(/hamburgerBackground.svg)",
						backgroundSize: "100% auto",
						backgroundRepeat: "no-repeat",
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						opacity: isMenuVisible ? 1 : 0,
						transition: "all 200ms ease",
						zIndex: 0,
					}}
				/>

				<HorizontalGroup
					justify="space-between"
					style={{ alignSelf: "stretch", zIndex: 1 }}
					align="center"
				>
					<Link href="/">
						<a>
							<Image
								className="logo"
								src="/rewave.svg"
								width="135px"
								height="22px"
							/>
						</a>
					</Link>
					<MobileOnly>
						<Image
							src={isMenuVisible ? "/cancel.svg" : "/hamburger.svg"}
							width="40px"
							height="22px"
							onClick={() => setIsVisibleMenu((v) => !v)}
						/>
					</MobileOnly>
				</HorizontalGroup>
				<HeaderContent align="center">
					<div />
					<Links spacing="48px" verticalSpacing="16px">
							<HeaderLink  >
								<Link href="/" >Home</Link>
							</HeaderLink>
							<HeaderLink  active={pathname === "/faq"}>
								<Link href="/faq">FAQ &amp; Support</Link>
							</HeaderLink>
							<HeaderLink active={pathname === "/contact"}>
								<Link href="/contact" > Contact</Link>
							</HeaderLink>
					</Links>
					<ResponsiveHorizontalGroup
						align="center"
						spacing="24px"
						verticalSpacing="10px"
					>
						 <HeaderLink ctive={pathname === "/login"}>
						<Link href="/login" >Login</Link>
						</HeaderLink> 
						
						<Button  theme={{...GreyButton,padding:'0'}}>
						<Link href="/login"><div style={{padding:'12px 40px'}}>REGISTER</div></Link>
						</Button>
						
					</ResponsiveHorizontalGroup>
				</HeaderContent>
			</InnerContainer>
		</Container>
	)
}

export default Header
