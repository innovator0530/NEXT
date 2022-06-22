import { useState } from "react"
import {
	ImageContainer,
	MessageContainer,
	NotificationContainer,
	NotificationDivider,
	DateInfo,
	NotificationTitle,
	ButtonContainer,
	buttonReleaseRejectedColor,
	buttonReleaseActionNeededColor,
} from "./NotificationList_styles"
import Image from "next/image"
import Button from "../../button/button"
import { Notification } from "../../../models/notifications.models"
import { useRouter } from "next/router"

const NotificationListItem = (props) => {
	const router = useRouter()
	const notification: Notification = props.notification
	let buttonText
	let buttonColor
	let msg = `Your Release “${notification.releaseTitle}” `
	switch (notification.type) {
		case "APPROVED":
			msg += "was Approved"
			break
		case "REJECTED":
			buttonText = "SHOW DETAILS"
			buttonColor = buttonReleaseRejectedColor
			msg += "was Rejected"
			break
		case "ACTION_NEEDED":
			buttonText = "TAKE ACTION"
			buttonColor = buttonReleaseActionNeededColor
			msg += "- Action needed"
			break
	}
	const navigate = (e) => {
		e.preventDefault()
		router.push(`/app/releases/${notification.releaseId}`)
	}
	return (
		<>
			<NotificationContainer ref={props.containerRef}>
				<ImageContainer>
					{notification.coverUrl && (
						<Image priority={true} src={notification.coverUrl} layout="fill" />
					)}
				</ImageContainer>
				<MessageContainer>
					<DateInfo>
						{new Date(notification.time).toLocaleDateString("de-DE", {})}
					</DateInfo>
					<NotificationTitle>{msg}</NotificationTitle>
				</MessageContainer>
				<ButtonContainer onClick={navigate}>
					{buttonText && (
						<Button
							theme={{
								color: buttonColor,
								backgroundColor: "#0000",
								border: "1.35px solid " + buttonColor,
							}}
						>
							{buttonText}
						</Button>
					)}
				</ButtonContainer>
			</NotificationContainer>
			{props.index < props.length - 1 && <NotificationDivider />}
		</>
	)
}

function NotificationList({ style, notifications, lastNotificationRef }) {
	console.log(notifications)

	const notificationItems = notifications.map((notifcation, index) => {
		if (index === notifications.length - 1) {
			return (
				<NotificationListItem
					containerRef={lastNotificationRef}
					index={index}
					length={notifications.length}
					notification={notifcation}
					key={index}
				/>
			)
		} else {
			return (
				<NotificationListItem
					index={index}
					length={notifications.length}
					notification={notifcation}
					key={index}
				/>
			)
		}
	})
	return <div style={style}>{notificationItems}</div>
}

export default NotificationList
