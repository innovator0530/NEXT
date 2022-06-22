import React from "react"
import { ActionButtonsContainer, Button } from "../../../styles/admin"

function ModerationActionButtons({ submitAction }) {
	return (
		<ActionButtonsContainer>
			<Button
				theme={{
					backgroundColor: "rgba(191, 73, 73, 0.15)",
					backgroundColorHover: "rgba(191, 73, 73, 0.075)",
					fontColor: "#BF4949",
				}}
				onClick={() => submitAction("REJECTED")}
			>
				Reject
			</Button>
			<Button
				onClick={() => submitAction("ACTION_NEEDED")}
				style={{ margin: "0 8px" }}
				theme={{
					borderColor: "#EBBD45",
					backgroundColorHover: "#EBBD4520",
					fontColor: "#EBBD45",
				}}
			>
				Action Needed
			</Button>
			<Button
				onClick={() => submitAction("APPROVED")}
				theme={{
					backgroundColor: "#39C157",
					backgroundColorHover: "#39C157DD",
					fontColor: "#FFFFFF",
				}}
			>
				Approve
			</Button>
		</ActionButtonsContainer>
	)
}

export default ModerationActionButtons
