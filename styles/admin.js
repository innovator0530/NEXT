import styled from "styled-components"

export const Title = styled.h1`
	font-style: normal;
	font-weight: 600;
	font-size: 36px;
	line-height: 41px;
	color: #212121;
	margin-bottom: 0;
`

export const TitleContainer = styled.div`
	display: flex;
`

export const ActionButtonsContainer = styled.div`
	display: inline-flex;
	justify-content: flex-end;
	margin-left: auto;
`

export const Button = styled.button`
	cursor: pointer;
	background: ${(props) =>
		props.theme.backgroundColor ? props.theme.backgroundColor : "none"};
	border: ${(props) =>
		props.theme.borderColor ? "1px solid " + props.theme.borderColor : "none"};
	color: ${(props) => props.theme.fontColor};
	padding: 10px 16px;
	font-size: 16px;
	line-height: 19px;
	font-weight: 500;
	outline: none;
	border-radius: 11px;
	:hover {
		background-color: ${(props) => props.theme.backgroundColorHover};
	}
	:active {
		background-color: ${(props) => props.theme.backgroundColor};
	}
	:focus {
		outline: none;
	}
	transition: all 0.3s;
`

export const EditButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const UserDatabaseTitleContainer = styled.div`
	display: flex;
`

export const EarningReportsUploadContainer = styled.div`
	background: rgba(0, 0, 0, 0.02);
	border: 1px dashed rgba(0, 0, 0, 0.5);
	box-sizing: border-box;
	border-radius: 8px;
	padding: 40px 0 0 0;
	text-align: center;
`

export const EarningsUploadButton = styled.button`
	border: none;
	outline: none;
	background: #000000;
	border-radius: 10px;
	padding: 15.5px 0;
	font-size: 14px;
	line-height: 17px;
	color: #ffffff;
	width: 286px;
	cursor: pointer;
	:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}
	:focus {
		outline: none;
	}
`

export const EarningsLoadingInfo = styled.div`
	margin: 11px 0 12px 0;
	height: 17px;
	font-size: 14px;
	line-height: 17px;
	color: rgba(0, 0, 0, 0.5);
`

export const SettingsSubtitle = styled.h4`
	margin-top: 16px;
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	color: #000000;
	opacity: 0.35;
	margin-bottom: 8px;
`

export const SettingsDisableContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`
export const SettingsDisableLabel = styled.h4`
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	opacity: 0.8;
`

export const YesButton = styled.button`
	outline: none;
	cursor: pointer;
	margin-left: 12px;
	background: none;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border: ${props=>props.active?'1.5px solid #000000':'1px solid rgba(0, 0, 0, 0.1)'};
	color: ${props=>props.active?'#000000':'rgba(0, 0, 0, 0.2)'};
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	padding: 8px 16px;
	font-size: 14px;
	line-height: 17px;
	margin-right: -1px;
`

export const NoButton = styled.button`
	outline: none;
	background: none;
	cursor: pointer;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border: ${props=>props.active?'1.5px solid #000000':'1px solid rgba(0, 0, 0, 0.1)'};
	color: ${props=>props.active?'#000000':'rgba(0, 0, 0, 0.2)'};
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	padding: 8px 16px;
	font-size: 14px;
	line-height: 17px;
`