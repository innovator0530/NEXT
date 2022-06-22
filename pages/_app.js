import Head from "next/head"
import "../styles/globals.css"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { createGlobalStyle } from "styled-components"
import { SessionProvider } from "next-auth/react"

const resizedRoutes = ["/", "/faq", "/404", "/contact", "/index"]

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	const handleRouteChange = useCallback((url) => {
		window.gtag("config", "[Tracking ID]", {
			page_path: url,
		})
	}, [])

	useEffect(() => {
		router.events.on("routeChangeComplete", handleRouteChange)
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange)
		}
	}, [router.events])

	let scaleViewport = false
	if (typeof window !== "undefined") {
		if (
			screen.width < 801 &&
			resizedRoutes.includes(window.location.pathname)
		) {
			scaleViewport = true
		}
	}
	return (
		<SessionProvider session={pageProps.session}>
			<GlobalStyle />
			<Head>
				<title>Swiss Music Distributor for Independent Artists | REWAVE</title>
				<meta
					name="description"
					content="REWAVE is a music distributor that helps artists publish their music on Spotify, YouTube, Amazon, Wynk, and 70 other platforms for free"
				></meta>
				{/* <meta name="viewport" content=""></meta> */}
				<meta
					name="viewport"
					content={scaleViewport ? "width=device-width, initial-scale=1" : ""}
				></meta>
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp
