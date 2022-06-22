import styled from "styled-components"

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${(props) =>
		props.open ? "rgba(0,0,0,.1)" : "rgba(0,0,0,0)"};
	display: ${(props) => (props.open ? "flex" : "none")};
	z-index: ${(props) => (props.open ? "400" : "-1000")};
	justify-content: center;
	transition: background-color 0.3s;
`

export const Modal = styled.div`
	position: fixed;
	height: auto;
	opacity: ${(props) => (props.open ? "1" : "0")};
	box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.2);
	background-color: #fff;
	width: 600px;
	max-width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	//margin-top: 10vh;
	/* transform: ${(props) =>
		props.open ? "translateY(-50%)" : "translateY(-60%)"}; */
	border-radius: 12px;
	transition: opacity 0.5s;
    overflow: hidden;
`
export const SideNavigationContainer = styled.div`
	padding: 37px 20px;
`

export const ModalTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

export const UpperTitle = styled.h3`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.025em;
	color: rgba(0, 0, 0, 0.35);
	margin-bottom: 16px;
`
export const TopHalf = styled.div`
	border-bottom: 1px solid #cccccc;
	padding: 24px;
	padding-bottom: 13px;
`

export const CloseCross = styled.button`
	cursor: pointer;
	background: none;
	border: none;
	outline: none;
	width: 24px;
	height: 24px;
	position: relative;
	margin-top: -6px;

	.bar {
		position: absolute;
		left: 11px;
		width: 2.35px;
		height: 17.44px;
		border-radius: 20px;
		background: #c4c4c4;
		transform: rotate(45deg);
		transition: all 0.3s;
	}
	:hover {
		.bar {
			background: #777;
		}
	}
	:active {
		.bar {
			background: #c4c4c4;
		}
	}
	.angled {
		transform: rotate(-45deg);
	}
`

export const SaveButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

// Content

export const MainInfoArea = styled.div`
	display: flex;
`

export const NameArea = styled.div``

export const ButtonContainer = styled.div`
	display: flex;
	margin-left: auto;
	margin-top: 20px;
`

export const Name = styled.h1`
	font-weight: 500;
	font-size: 24px;
	line-height: 29px;
	letter-spacing: -0.005em;
	color: #000000;
	margin-bottom: 0;
`

export const EmailContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 4px;
`

export const Email = styled.div`
	font-size: 18px;
	line-height: 22px;
	letter-spacing: -0.005em;
	color: #000000;
	opacity: 0.35;
`

export const PlanNameBadge = styled.div`
	background: rgba(0, 0, 0, 0.04);
	border-radius: 8px;
	padding: 6px 12px;
	margin-left: 9px;
	font-size: 14px;
	line-height: 17px;
	color: rgba(0, 0, 0, 0.8);
`
export const MetricsContainer = styled.div`
	margin-top: 36px;
	display: grid;
	grid-template-columns: 20% 25% 25% 35%;
`
export const MetricsLabel = styled.div`
	margin-bottom: 8px;
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	letter-spacing: 0.015em;
	color: #000000;
	opacity: 0.35;
`
export const MetricsValue = styled.div`
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.005em;
	color: #000000;
	opacity: 0.8;
    margin-bottom: 24px;
`

export const ProfileDataHeading = styled.div`
font-weight: normal;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.005em;
	color: #212121;
    margin-top: 16px;
`

export const BottomHalf = styled.div`
	padding: 24px;
	padding-bottom: 8px;
	background: #fafafa;
`

export const ProfileDataContainer = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
`
export const ProfileDataHR = styled.div`
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
`