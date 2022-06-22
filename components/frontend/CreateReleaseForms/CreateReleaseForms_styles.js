import styled from "styled-components"

export const Form = styled.form`
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}
`

export const FormGroup = styled.div`
	margin-top: 32px;
`

export const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	.popover {
	}
`

export const IconContainer = styled.button`
	background: none;
	border: none;
	position: relative;
	width: 16px;
	height: 16px;
	cursor: pointer;
	margin-left: 6px;
	:focus .popover {
		/* display: flex; */
	}
	:focus {
		outline: none;
	}
`

export const Popover = styled.div`
	z-index: 400;
	max-width: 380px;
	min-width: 80px;
	padding: 10px;
	color: rgba(255, 255, 255, 0.5);
	background: #1a1a1a;
	border: 0.5px solid rgba(255, 255, 255, 0.05);
	box-sizing: border-box;
	box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.65);
	border-radius: 8px;
	position: absolute;
	top: 100%;
	margin-top: 7px;
	font-size: 11px;
	line-height: 13px;
	color: rgba(255, 255, 255, 0.5);
	a {
		text-decoration: underline;
	}
`

export const Label = styled.label`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: ${props=> props.theme&&props.theme.label &&props.theme.label.fontColor?props.theme.label.fontColor: "#FFFFFFCC"};
`

export const DividedContainer = styled.div`
	display: flex;
`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: ${p=>p.alignLeft?'inherit':'flex-end'};
	margin-top: ${p=>p.marginTop||'48'}px;
`
export const ErrorMessageContainer = styled.div`
	text-align: right;
	color: #e25e43;
	height: 100px;
	margin-top: 16px;
`

export const Comment = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: #ffffff;
	opacity: 0.8;
`

export const CheckboxLabel = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    opacity: 0.8;
`
