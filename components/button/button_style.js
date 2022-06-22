import styled from "styled-components"

export const HtmlButton = styled.button`
	border-radius: ${props=>props.theme.borderRadius||'16px'};
	border: ${(props) => (props.theme.border ? props.theme.border : 0)};
	padding: ${(props) => (props.theme.padding ? props.theme.padding : '12px 40px')};
	font-weight: ${(props) => (props.theme.fontWeight ? props.theme.fontWeight : 600)};
	font-size: 16px;
	display: flex;
	text-align: center;
	align-self: ${(props) => (props.alignSelf ? props.alignSelf : "inherit")};
	align-items: center;
	justify-content: center;
	text-decoration: none;
	background-color: ${(props) => props.theme.backgroundColor};
	color: ${(props) => props.theme.color};
	opacity: ${(props) => (props.theme.opacity ? props.theme.opacity : 1)};
	${props=>props.theme.margin?'margin:'+props.theme.margin+';':''}
	${props=>props.theme.width?'width: '+props.theme.width+';':''}

	transition: all 200ms ease-in;

	:disabled {
		background-color: ${(props) => props.disabledColor};
		color: white;
		cursor: not-allowed;
		pointer-events: none;
	}

	:active {
		opacity: 1;
	}

	:hover {
		opacity: ${(props) => (props.theme.opacity ? 1 : 0.4)};
	}

	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	cursor: pointer;
	outline: 0;
	position: relative;
	overflow: hidden;

	@media screen and (max-width: 800px) {
		font-size: 14px;
	}
`

export const GreyButton = {
	backgroundColor: "transparent",
	color: "white",
	border: "2px solid white",
	opacity: 0.4,
}
