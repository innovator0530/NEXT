import styled, { css, createGlobalStyle } from "styled-components"

export const Container = styled.div`
	position: relative;
`

export const IconButton = styled.button`
	background: none;
	border: none;
	position: absolute;
	top: 0;
	right: 0;
	width: 72px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	:active {
		outline: none;
	}
`

export const IconContainer = styled.div`
	width: 24px;
	height: 22px;
	position: relative;
`

export const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
        width: 100%;
    }
    .react-datepicker-popper{
        width: 100%;
    }

    .react-datepicker{
        width: 100%;
        background-color: #151515;
        
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        outline: none;
        box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    }

    .react-datepicker__triangle{
        display: none;
    }

    .react-datepicker__navigation{
        border: none;
        background: none;
        height: 13px;
        width: 13px;
        border-top: 1.5px solid rgba(255, 255, 255, 0.5);
        border-left: 1.5px solid rgba(255, 255, 255, 0.5);
        margin: 10px 5px 10px 5px;
        transform: rotate(-45deg);
    }

    .react-datepicker__navigation--next{
        transform: rotate(135deg);
    }
    
    .react-datepicker__navigation:hover{
        border: none;
        border-top: 1.5px solid rgba(255, 255, 255, 0.8);
        border-left: 1.5px solid rgba(255, 255, 255, 0.8);

    }

    .react-datepicker__navigation:focus{
        outline: none;
        border: none;
        border-top: 1.5px solid rgba(255, 255, 255, 0.8);
        border-left: 1.5px solid rgba(255, 255, 255, 0.8);
    }

    .react-datepicker__month-container{
        width: 100%;
    }

    .react-datepicker__header {
        background-color: transparent;
        border: none;
        padding: 20px 0 0 0;
    }

    .react-datepicker__current-month{
        font-weight: 500;
        text-transform: uppercase;
        color: #fff;
        font-size: 14px;
        line-height: 17px;
    }

    .react-datepicker__day-names{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .react-datepicker__day-names .react-datepicker__day-name{
        margin-top: 24px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.2);
    }

    .react-datepicker__month{
        margin: 20px 0 8px 0;
    }

    .react-datepicker__week{
        display: flex;
        justify-content: space-around;
    }

    .react-datepicker__day{
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0.08em;
        color: rgba(255, 255, 255, 0.5);
        height: 28px;
        width: 28px;
        border-radius: 50%;
        margin-bottom: 2px;
    }
    .react-datepicker__day:focus{
        outline: none;
    }
    .react-datepicker__day:hover{
        background: rgba(255, 255, 255, 0.1);
        height: 28px;
        width: 28px;
        border-radius: 50%;
    }

    

    .react-datepicker__day--outside-month{
        color: rgba(255, 255, 255, 0.15);
    }

    .react-datepicker__day--weekend{
        color: rgba(255, 255, 255, 0.35);
    }

    .react-datepicker__day--keyboard-selected{
        background: rgba(255, 255, 255, 0.1);
        height: 28px;
        width: 28px;
        border-radius: 50%;
    }

    .react-datepicker__day--selected{
        background-color: #fff;
        color: #151515;
    }

`
