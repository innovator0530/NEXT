import AppHeader from "../../components/frontend/Header/AppHeader"
import {
	Background,
	BigTitle,
	Container,
	darkTheme,
	DashboardAnnouncementPanel,
	SmallSubtitle,
} from "../../styles/frontend"
import Button from "../../components/button/button"
import NotificationList from "../../components/frontend/NotificationList/NotificationList"
import { ThemeProvider } from "styled-components"
import Link from "next/link"
import { withAuthSession } from "../../middleware/nextAuthSession"
import { GetServerSideProps } from "next"
import User from "../../models/database/user"
import { useState } from "react"
import { server } from "../../config"
import { getNotifications } from "../api/notifications"
import { usePagination } from "../../hooks/usePagination"
import styled from 'styled-components'

const AFFILIATE_POSITION = 3;

const PAGE_SIZE = 5;

function dashboard(props) {
	const [notifications, setNotifications] = useState<any[]>(props.notifications || [])
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState(true);


	const { lastElementRef } = usePagination(async (): Promise<void> => {
		if (!hasMore) return;
		setIsLoading(true);
		const res = await fetch(`${server}/api/notifications?limit=${PAGE_SIZE}&exclusive_start_id=${notifications[notifications.length - 1]._id}&allowadmincontext=true`)
		const result = await res.json();
		if (result.data.length > 0) {
			setNotifications(current => [...current, ...result.data])
		}
		else {
			setHasMore(false);
		}
		setIsLoading(false);
	}, isLoading, hasMore)


	return (
		<ThemeProvider theme={darkTheme}>
			<Background>
				<AppHeader userContext={props.userContext} theme={darkTheme} label={props.userContext ? 'User Access Mode' : 'free'}  />
				<Container>
					<BigTitle>
						Welcome
						{props.user && props.user.firstName
							? ", " + props.user.firstName
							: ""}
					</BigTitle>
					<DashboardAnnouncementPanel>
						<div className="bubble bubble1" />
						<div className="bubble bubble2" />
						<div className="bubble bubble3" />
						<h2 className="title">Upgrade your Plan</h2>
						<Link href={props.userContext ? "#" : "/app/plan-upgrade"}>
							<Button
								style={{ width: "316px", height: "47px", marginTop: "24px" }}
							>
								VIEW CURRENT PLAN
							</Button>
						</Link>
					</DashboardAnnouncementPanel>
					<SmallSubtitle style={{ marginTop: "48px" }}>
						Notifications
					</SmallSubtitle>
					<NotificationList
						notifications={notifications.slice(0, AFFILIATE_POSITION - 1)}
						style={{ margin: "24px 0", minHeight: '290px' }}
						lastNotificationRef={lastElementRef}
					/>
					<div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '15px', backgroundColor: '#fefefe', borderRadius: '10px' }}>
						<iframe
							style={{ color: 'white' }}
							src="https://www.fiverr.com/embed_gigs?id=U2FsdGVkX18SXp4Xxh0j/rhp9HL7JHFO+R28Tzgr6SphgBz1xconGXA/h8BGbVvC57R0722Y1bWRcBOmsEbdgxSiop4KtAvphOQHBJ1a1BN41g8UkqP0PxY5iKPwB3E6wDPbjbamjk3ybtS+G3D9v4kOkXKi+qZhbyZyVW+9ZcSddPUisBvC1BTe14B3IYX2TwWEekdrXLVYJ8uFifHSHsSpq0bSqCY+JLvW4eaIBGrQEv57pCgtl7c0kyR7uY/2Wljcw5iIwvsZwntwQpcDu6G5fmzrpYFXuOlUJYgKJnBQ59P2DJBZCRUQHmOMCX4pOFxswbLpxoKiRwycHfkVyXSjhewwZq/aiGjXYXh8XVSjTE+eA7krmgUK+0FcQqiTA632ALzmjkHzLN9wINE8HpIPKCki3yuLtK20pCQcFn4FDwusFPutmjOvNQTwQ96dxZXTFMkoOwFu+gPr1gEYm18FK40TS27WUTSgWtO2K7vsegArtn2hCnlrowEVJI9XVpZEH7u3F7SKuPv88EFNzQ==&affiliate_id=269202&strip_google_tagmanager=true"
							loading="lazy" data-with-title="true" className="fiverr_nga_frame"
							frameBorder="0" height="525px" width="100%"
							onLoad={() => {
								var s = document.createElement("script");
								s.setAttribute("src", "https://npmassets.fiverrcdn.com/nga/onload_iframe.js");
								document.body.appendChild(s);
							}} >
						</iframe>
					</div>
					<NotificationList
						notifications={notifications.slice(AFFILIATE_POSITION)}
						style={{ margin: "24px 0" }}
						lastNotificationRef={lastElementRef}
					/>
				</Container>
				<div style={{ position: 'absolute', bottom: 0, width: '100%' }}>

				</div>
			</Background>
		</ThemeProvider>
	)
}


export const getServerSideProps: GetServerSideProps = withAuthSession(async function ({ req, res }, session) {
	// get user and notifications;
	const [dbUser, notifications] = await Promise.all([
		User.findOneById(session.user.id, { firstName: 1 }),
		getNotifications(session.user.id, PAGE_SIZE)
	])
	// console.log('dbUser :>> ', dbUser);
	// console.log(`notifications`, notifications)
	return {
		props: { user: { firstName: dbUser.firstName || '' }, notifications, userContext: !!session.user.isContextUser },
	}
}, true)

export default dashboard
