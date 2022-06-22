import styled from "styled-components"

export const DarkGrey = "#1E1E1D"
export const DarkBlue = "#112861"
export const TextGrey = "#8A8A8A"

/// container

export const Section = styled.section`
	background-color: ${(props) => props.color};
	min-height: 100vh;
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	background-size: 100% 100%;
	align-items: center;

	@media screen and (max-width: 800px) {
		height: auto;
		align-items: center;
		padding: 0 !important;
	}
`

export const HorizontalGroup = styled.div`
	display: flex;
	flex-direction: row;
	align-items: ${(props) => (props.align ? props.align : "initial")};
	align-self: ${(props) => (props.alignSelf ? props.alignSelf : "initial")};
	justify-content: ${(props) => (props.justify ? props.justify : "initial")};
	flex: ${(props) => (props.flex ? 1 : "initial")};

	> * {
		margin-left: ${(props) => (props.spacing ? props.spacing : "none")};
	}

	& :first-child {
		margin-left: ${(props) => (props.spacing ? 0 : "none")};
	}
`

export const VerticalGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.align ? props.align : "initial")};
	align-self: ${(props) => (props.alignSelf ? props.alignSelf : "initial")};
	justify-content: ${(props) => (props.justify ? props.justify : "initial")};
	flex: ${(props) => (props.flex ? 1 : "initial")};

	> * {
		margin-bottom: ${(props) => (props.spacing ? props.spacing : "none")};
	}

	& :last-child {
		margin-bottom: ${(props) => (props.spacing ? 0 : "none")};
	}
`

export const InnerSection = styled(HorizontalGroup)`
	width: 100%;
	height: 100%;
	max-width: 1000px;
	margin: 0px 150px;
	padding: 80px 0px;
	position: relative;

	@media screen and (max-width: 800px) {
		flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
		margin: 0px 24px;
		padding: 32px 0px;
		/* width: 100%; */
		justify-content: center;
	}
`

export const VerticalSection = styled(VerticalGroup)`
	align-items: flex-start;
	justify-content: center;
	max-width: 900px;
	margin: 0px 24px;
`
/// images

export const Independent = styled.div`
	position: absolute;
	bottom: 0;
	right: -20%;
	width: 100%;
	height: 100%;
`

export const Speed = styled.div`
	position: absolute;
	bottom: 0;
	top: 0;
	left: -20%;
	width: 100%;
	height: 100%;
`

export const Pricing = styled.div`
	width: 100%;
	height: 100%;
	margin-left: 40px;
	position: relative;
	@media screen and (max-width: 800px) {
		margin-left: 0px;
		margin-top: 20px;
	}
`
export const Paid = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	margin-right: 40px;
	@media screen and (max-width: 800px) {
		margin-right: 0px;
		margin-top: 20px;
	}
`

/// INPUT

export const Input = styled.input`
	margin-bottom: 20px;
	appearance: none;
	padding: 16px 24px;
	border: 1px solid #434343;
	box-sizing: border-box;
	border-radius: 12px;
	flex: 1;
	min-width: 0;
	background-color: transparent;
	color: white;
	font-size: 14px;
	font-style: normal;
	font-weight: normal;

	:focus {
		outline: 0;
		border: 1px solid white;
	}
	::placeholder,
	::-webkit-input-placeholder {
		color: #434343;
	}
	:-ms-input-placeholder {
		color: #434343;
	}
	:hover {
		border: 1px solid white;
	}
	-webkit-touch-callout: default !important;
	-webkit-user-select: text !important;
`

export const Input2 = styled.input`
    width: 100%;
    background: #141414;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    border-radius: 12px;
    padding: 15px 24px;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
    margin-top: 16px;
    :focus{
        outline:none;
        border-color: #fff;
    }
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        opacity: 0.5;
    }
    ::-moz-placeholder { /* Firefox 19+ */
        opacity: 0.5;
    }
    :-ms-input-placeholder { /* IE 10+ */
        opacity: 0.5;
    }
    :-moz-placeholder { /* Firefox 18- */
        opacity: 0.5;
    }
	${props=>props.invalid?'border-color: #E25E43;':''}
`

export const MultilineInput = styled.textarea`
	margin-bottom: 20px;

	appearance: none;
	padding: 12px 14px;
	border: 1px solid #434343;
	box-sizing: border-box;
	border-radius: 12px;
	flex: 1;
	min-width: 0;
	background-color: transparent;
	color: white;
	font-size: 14px;
	font-style: normal;
	font-weight: normal;

	:focus {
		outline: 0;
		border: 1px solid white;
	}
	::placeholder,
	::-webkit-input-placeholder {
		color: #434343;
	}
	:-ms-input-placeholder {
		color: #434343;
	}
	:hover {
		border: 1px solid white;
	}
	-webkit-touch-callout: default !important;
	-webkit-user-select: text !important;

	resize: none;
`

export const MobileOnly = styled.div`
	display: none;

	@media (max-width: 800px) {
		display: block;
	}
`

export const Form = styled.form`
	max-width: 500px;
	display: flex;
	flex-direction: column;
	flex: 1;

	@media screen and (max-width: 800px) {
		align-self: stretch;
	}
`
