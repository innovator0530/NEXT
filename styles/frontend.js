import styled from "styled-components"

export const Background = styled.div`
	width: 100%;
	height: 100%;
	min-height: 110vh;
	background-color: ${(props) => props.theme.backgroundColor};
	z-index: -2;
	overflow: hidden;
`

export const BigTitle = styled.h1`
	font-family: TT Commons W01 Bold;
	font-size: 72px;
	line-height: 76px;
`

export const ContainerWrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;
`
export const Container = styled.div`
	width: 100%;
	max-width: ${(props) =>
		props.width ? "" + (props.width + 30) + "px" : "870px"};
	padding: 0 15px;
	margin: 57px auto;
	height: 100%;
`

export const DashboardAnnouncementPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #141414;
	border-radius: 10px;
	height: 173px;
	position: relative;
	overflow: hidden;
	.title {
		font-size: 28px;
		opacity: 0.8;
		color: #fff;
	}
	.bubble {
		background: radial-gradient(
			50% 50% at 50% 50%,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.025) 100%
		);
		border-radius: 50%;
	}
	.bubble1 {
		position: absolute;
		width: 281px;
		height: 281px;
		left: -116px;
		top: -70px;
	}
	.bubble2 {
		position: absolute;
		width: 281px;
		height: 281px;
		left: 507px;
		top: -236px;
	}
	.bubble3 {
		position: absolute;
		width: 281px;
		height: 281px;
		left: 648px;
		top: 110px;
	}
`

export const SmallSubtitle = styled.h3`
	font-family: TT Commons W01 Bold;
	font-size: 24px;
	font-weight: 700;
	line-height: 28px;
`
// Styles for Pages "Create Release "

export const CreateReleaseTitle = styled.div`
	display: flex;
	justify-content: space-between;
`

export const CreateReleaseStageIndicator = styled.div`
	font-weight: bold;
	font-size: 72px;
	line-height: 76px;
	color: #ffffff;
	opacity: 0.05;
`

export const CreateReleaseTitleComment = styled.div`
	color: rgba(255, 255, 255, 0.5);
	.link {
		text-decoration: underline;
		color: rgba(255, 255, 255, 0.8);
	}
`
export const Subtitle = styled.h2`
	font-family: TT Commons W01 Bold;
	font-style: normal;
	font-weight: bold;
	font-size: 28px;
	line-height: 32px;
	color: #ffffff;
	margin-top: 32px;
`

export const LabelAnnotationSuperscript = styled.span`
	line-height: 10.89px;
	font-size: 9px;
	opacity: 0.35;
`

export const LabelActionButton = styled.button`
	padding: 5px 10px;
	font-size: 12px;
	line-height: 15px;
	color: rgba(255, 255, 255, 0.5);
	background: rgba(255, 255, 255, 0.04);
	border: none;
	border-radius: 10px;
	cursor: pointer;
	margin-left: 1px;
	margin-top: -4px;
	:focus {
		background: rgba(255, 255, 255, 0.02);
		outline: none;
	}
	:hover {
		background: rgba(255, 255, 255, 0.02);
	}
	:active {
		background: rgba(255, 255, 255, 0.01);
		outline: none;
	}
	transition: all 0.15s;
`

export const lightTheme = {
	name: "light",
	backgroundColor: "#FAFAFA",
	header: {
		backgroundColor: "#ffffff",
		boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.1)",
		fontColor: "#212121",
		activeBarColor: "#000000",
		hoverColor: "#0004",
		borderBottom: "1px solid #e1e1e1",
	},
	getRgba: (opacity) => `rgba(0,0,0,${opacity})`,
	baseFontColor: "#000000",
	label: { fontColor: "#00000059" },
	fontColor: "#212121",
	fontColorHover: "#777",
	input: {
		background: "#fff",
		borderColor: "rgba(0, 0, 0, 0.1)",
		borderColorFocus: "rgba(0,0,0,0.3)",
	},
	scrollThumbColor: "rgba(0, 0, 0, 0.1)",
}

export const darkTheme = {
	name: "dark",
	backgroundColor: "#1A1A1A",
	header: {
		backgroundColor: "#141414",
		boxShadow: "none",
		fontColor: "#ffffff",
		activeBarColor: "#ffffff",
		hoverColor: "#fffa",
	},
	getRgba: (opacity) => `rgba(255,255,255,${opacity})`,
	baseFontColor: "#ffffff",
}

export const BalanceContainer = styled.div`
	border: 1px solid #302e2e;
	box-sizing: border-box;
	border-radius: 12px;
	text-align: center;
	padding: 32px;
	margin-bottom: 12px;
`

export const BalanceTitle = styled.div`
	color: #ffffff;
	opacity: 0.35;
	margin-bottom: 8px;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
`
export const Balance = styled.div`
	color: #ffffff;
	font-weight: 500;
	font-size: 28px;
	line-height: 34px;
`

export const CurrentPlanContainer = styled.div`
	margin-top: 19px;
	margin-bottom: 39px;
	border: 1px solid #302e2e;
	box-sizing: border-box;
	border-radius: 12px;
	padding: 32px;
	text-align: center;
`

export const CurrentPlanTitle = styled.h3`
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	color: #ffffff;
	opacity: 0.35;
	margin-bottom: 8px;
`
export const CurrentPlanName = styled.h3`
	font-weight: 500;
	font-size: 28px;
	line-height: 34px;
	text-align: center;
	color: #ffffff;
`

export const PlanOptionsContainer = styled.div`
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	column-gap: 6px;
`

export const PlanOptionCard = styled.div`
	background: #141414;
	border: ${(props) => (props.active ? "0.5px solid #e0be47" : "none")};
	box-sizing: border-box;
	border-radius: 8px;
	text-align: center;
	.active-sign {
		display: ${(props) => (props.active ? "block" : "none")};
		background: #141414;
		border: 0.5px solid #e0be47;
		box-sizing: border-box;
		border-radius: 21px;
		font-weight: 600;
		font-size: 8px;
		line-height: 10px;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
		transform: translateY(-8px);
		padding: 2px 9px;
		margin: 0 auto;
		width: 48px;
	}
`
export const PlanOptionName = styled.h3`
	font-size: 28px;
	line-height: 34px;
	text-align: center;
	color: #ffffff;
	margin-bottom: ${(props) => props.mb || "80px"};
	margin-top: ${(props) => props.mt || "42px"};
`

export const PlanOptionFeature = styled.div`
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: #ffffff;
	opacity: 0.5;
	margin-bottom: ${(props) => props.mb || "63px"};
`
export const PlanOptionPrice = styled.h2`
	font-weight: 600;
	font-size: 36px;
	line-height: 44px;
	color: #ffffff;
	margin-bottom: 47px;
`
export const ModerationComment = styled.div`
	padding: 16px 16px 24px 16px;
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.fontColor};
	border-radius: 8px;
`
export const ModerationCommentTitle = styled.h4`
	margin-bottom: 16px;
	font-weight: 500;
	font-size: 18px;
	line-height: 22px;
	color: ${(props) => props.fontColor};
`
export const RewaveIdField = styled.div`
	font-size: ${p=>p.fontSiz||'18px'};
	line-height: 22px;
	color: #fff;
`
export const ContentStyleGuideContainer = styled.div`
	color: #fff;
	text-align: left;
`