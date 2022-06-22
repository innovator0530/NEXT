import React, { CSSProperties, FunctionComponent } from "react"
import { Container, InnerContainer } from "./body_style"
import Header from "../header/header"
import Footer from "../footer/footer"

interface BodyProps {
	topPadding?: boolean
	style?: CSSProperties
	innerContainer?: boolean
}

const Body: FunctionComponent<BodyProps> = ({
	children,
	topPadding = false,
	style = undefined,
	innerContainer = false,
}) => {
	return (
		<Container style={{ paddingTop: topPadding ? "100px" : 0, ...style }}>
			<Header />
			{innerContainer ? <InnerContainer>{children}</InnerContainer> : children}
			<Footer />
		</Container>
	)
}

export default Body
