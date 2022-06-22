import { withAuthSession } from "@middleware/nextAuthSession"
import { useState } from "react"
import { ThemeProvider } from "styled-components"
import Button from "../../components/button/button"
import AppHeader from "../../components/frontend/Header/AppHeader"
import RoyaltyHistoryList from "../../components/frontend/RoyaltyHistoryList/RoyaltyHistoryList"
import { server } from "../../config"
import { GlobalAppConfig } from "../../models/database/config"
import { SessionUser } from "../../models/user.models"
import {
	Background,
	Balance,
	BalanceContainer,
	BalanceTitle,
	BigTitle,
	Container,
	darkTheme,
} from "../../styles/frontend"

function royalty(props) {
	const [payoutPending, setPayoutPending] = useState<boolean>(
		props.payouts && props.payouts.some((p) => p.status === "PENDING")
	)

	const requestPayout = async () => {
		const fetchResult = await fetch(
			`${server}/api/earnings/payouts?allowadmincontext=true`,
			{ method: "POST" }
		)
		if (fetchResult.status === 200) {
			setPayoutPending(true)
		}
	}
	
	return (
		<ThemeProvider theme={darkTheme}>
			<Background>
				<AppHeader theme={darkTheme} label={props.isUserContext?'User Access Mode':'free'} userContext={props.isUserContext} />
				<Container>
					<BigTitle>Royalty Statements</BigTitle>
					<BalanceContainer>
						<BalanceTitle>Balance</BalanceTitle>
						<Balance>$ {props.balance / 100} USD</Balance>
					</BalanceContainer>
					<Button
						disabled={payoutPending || props.balance <= 1}
						onClick={requestPayout}
						theme={{ width: "100%" }}
					>
						{props.balance >= 1
							? payoutPending
								? "(PAY-OUT IN PROGRESS)"
								: "REQUEST PAY-OUT"
							: "REQUEST PAY-OUT POSSIBLE WITH AT LEAST $1.00 OF BALANCE"}
					</Button>
					<RoyaltyHistoryList
						earnings={props.earnings}
						payouts={props.payouts}
					/>
				</Container>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async ({ req,res },session) => {
	const user = session.user

	// Fetching Statements
	const statementsFetchResult = await fetch(
		`${server}/api/earnings/statements?allowadmincontext=true`,
		{ headers: { cookie: req.headers.cookie } }
	)
	const { earnings } =
		statementsFetchResult.status === 200
			? await statementsFetchResult.json()
			: []
		console.log('earnings :>> ', earnings);
	// Fetching Payouts
	const payoutsFetchResult = await fetch(
		`${server}/api/earnings/payouts?allowadmincontext=true`,
		{ headers: { cookie: req.headers.cookie } }
	)
	
	const payouts =
		payoutsFetchResult.status === 200 ? await payoutsFetchResult.json() : []
		console.log('payouts :>> ', payouts);
	// Fetching Balance:
	const balanceFetchResult = await fetch(
		`${server}/api/earnings/balance?allowadmincontext=true`,
		{ headers: { cookie: req.headers.cookie } }
	)
	const { balance } =
		balanceFetchResult.status === 200 ? await balanceFetchResult.json() : NaN


	// Fetching App Config

	// const cfr = await fetch(`${server}/api/config`);
	// const config:GlobalAppConfig = await cfr.json();

	return {
		props: { payouts, balance, earnings, isUserContext:!!user.isContextUser },
	}
},true)

export default royalty
