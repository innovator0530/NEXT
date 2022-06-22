import { withAuthSession } from "@middleware/nextAuthSession"
import NewUsersList from "components/admin/NewUsersList/NewUsersList"
import Subheader from "components/admin/Subheader/Subheader"
import AppHeader from "components/frontend/Header/AppHeader"
import { useState } from "react"
import { ThemeProvider } from "styled-components"
import { Title } from "styles/admin"
import { server } from "../../../config"
// import withSession from "../../../lib/session"
import { Payout } from "../../../models/earning.model"
import { Background, Container, lightTheme } from "../../../styles/frontend"

function payoutRequests(props) {
	const [payouts, setPayouts] = useState<Payout[]>(props.payouts)
	const approvePayout = async (id: string) => {
		const fetchResult = await fetch(
			`${server}/api/earnings/payouts/${id}/approve?sum=${
				payouts.find(p => p._id === id).sum
			}`,
			{ method: "PUT" }
		)
        if(fetchResult.status === 200){
            setPayouts([...payouts.filter(p=>p._id!==id)])
        }
	}
	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Subheader
					links={[
						{
							name: "Earnings Payout Requests",
							href: "/admin/earnings/payout-requests",
							active: true,
						},
						{
							name: "User Earning Reports",
							href: "/admin/earnings/earning-reports",
						},
					]}
				/>
				<Container width={990}>
					<Title>Earning Payout Requests</Title>
					<NewUsersList
						titles={["User", "Amount"]}
						checkOffUser={({ _id }) => approvePayout(_id)}
						buttonText="Paid"
						users={payouts.map((p) => ({
							_id: p._id,
							firstName: p.email,
							lastName: "",
							email: `$ ${p.sum / 100} USD`,
						}))}
					/>
				</Container>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async ({ req },session) => {

	const payoutRequestsFetchResult = await fetch(
		`${server}/api/earnings/pending-payouts`,
		{ headers: { cookie: req.headers.cookie } }
	)

	const payouts = await payoutRequestsFetchResult.json()
	return {
		props: { payouts },
	}
})

export default payoutRequests
