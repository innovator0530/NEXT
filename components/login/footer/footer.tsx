import React from "react"
import { CopyrightStatement, FooterContainer, FooterItem } from "./footer_style"
import Link from "next/link"

function Footer({ style }) {
	return (
		<FooterContainer style={style}>
			<FooterItem>
				<Link href="/privacypolicy">Privacy Policy</Link>
			</FooterItem>

			<FooterItem>
				<Link href="/terms-of-use">Terms of Use</Link>
			</FooterItem>

			<FooterItem>
				<Link href="/anti-fraud-policy">Anti-Fraud Policy</Link>
			</FooterItem>

			<FooterItem>
				<Link href="/imprint">Imprint</Link>
			</FooterItem>

			<CopyrightStatement>
				Copyright {new Date().getFullYear()} © J.S. Suisse GmbH. All Rights
				Reserved
			</CopyrightStatement>
		</FooterContainer>
	)
}

export default Footer
