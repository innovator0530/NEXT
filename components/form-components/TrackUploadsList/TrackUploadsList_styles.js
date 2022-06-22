import styled from "styled-components"

export const ListContainer = styled.ul`
	list-style: none;
`
export const ListItemContainer = styled.li`
	.blurrable {
		${(props) => (props.blurred ? "filter:blur(8px);" : "")}
	}
	position: relative;
	background: #141414;
	border-radius: 14px;
	display: flex;
	padding: 16px 24px;
	align-items: center;
	margin-bottom: 12px;
`

export const HandleContainer = styled.div`
	cursor: pointer;
	height: 22px;
	width: 13px;
	position: relative;
`

export const TrackIndex = styled.div`
	width: 116px;
	font-weight: 500;
	font-size: 20px;
	line-height: 24px;
	color: #ffffff;
	opacity: 0.8;
	margin-left: 16px;
`
export const TrackName = styled.div`
	font-size: 18px;
	line-height: 22px;
	color: #ffffff;
	opacity: 0.35;
	width: 187px;
`

export const TimelineContainer = styled.div`
	display: flex;
	flex-grow: 1;
	align-items: center;
`

export const TimelineWrapper = styled.div`
	flex-grow: 1;
	min-width: 50px;
	display: flex;
	align-items: center;
	//width: 60px;
`

export const Space = styled.div`
	content: "";
	width: 58px;
`

export const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
`

export const Button = styled.button`
	background: none;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-sizing: border-box;
	border-radius: 8px;
	padding: 7px 12px;
	font-weight: 500;
	font-size: 14px;
	line-height: 17px;
	color: rgba(255, 255, 255, 0.5);
	cursor: pointer;
	:focus {
		outline: none;
	}
	:hover {
		color: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.3);
		.icon {
			opacity: 0.8;
		}
	}
	:active {
		color: rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		.icon {
			opacity: 0.5;
		}
	}
`

export const TrashIconContainer = styled.div`
	opacity: 0.5;
	width: 14px;
	height: 15.92px;
	position: relative;
`

export const BlurredContainer = styled.div`
	z-index: 400;
	transition: opacity 0.3;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const LoadingSpinner = styled.div`
	display: inline-block;
	position: relative;
	width: 45px;
	height: 45px;
	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 30px;
		height: 30px;
		margin: 8px;
		border: 1.5px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
	}
	div:nth-child(1) {
		animation-delay: -0.45s;
	}
	div:nth-child(2) {
		animation-delay: -0.3s;
	}
	div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
