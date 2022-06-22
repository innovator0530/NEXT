import styled from "styled-components"

export const ListContainer = styled.ul`
	margin-top: 32px;
	list-style: none;
`
export const ListItemContainer = styled.li`
	background: #141414;
	border-radius: 14px;
	display: flex;
    margin-bottom: 12px;
`
export const LeftColumn = styled.div`
	width: 30%;
	padding: 16px 24px;
	color: #ffffff;
	opacity: 0.8;
	font-size: 18px;
	line-height: 22px;
`

export const MiddleColumn = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: rgba(255, 255, 255, 0.35);
	.light {
		color: rgba(255, 255, 255, 0.8);
	}
	margin: 19px 0 16px 0;
`
export const RightColumn = styled.div`
	margin-left: auto;
	display: flex;
    align-items: center;
`
export const Sum = styled.div`
	color: #ffffff;
	font-size: 18px;
	line-height: 22px;
`

export const DropdownButton = styled.button`
    
	background: none;
	border: none;
	display: flex;
	padding-left: 13px;
    padding-right: 8px;
	justify-content: center;
	align-items: center;
    position:relative;
    cursor: ${props=>props.disabled?'inherit':'pointer'};
    height: 30px;

    
	.dot {
        opacity: ${props=>props.disabled?'0':'1'};
		background: rgba(255, 255, 255, 0.2);
		width: 4px;
		height: 4px;
		border-radius: 2px;
		margin-right: 5px;
	}
    .dropdown{
        display: ${props=>props.disabled?'none':'block'};
        padding: 12px;
        border: none;
        opacity:  ${props=>props.open?'1':'0'};
        position:absolute;
        background: #141414;
        top: 0;
        right: 0;
        box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.65);
        border-radius: 8px;
        transform: translateY(30px) translateX(-16px);
        color: rgba(255,255,255,0.35);
		cursor: pointer;
		z-index: 400;
    }
	.dropdown-btn{
		cursor: pointer;
		display: flex;
		background: none;
		border:none;
		outline: none;
	}
	.dropdown-comment{
		text-align: left;
		margin-top: 10px;
		display: block;
		cursor: default;
	}
    /* :focus .dropdown{
        opacity: 1;
    } */
`

export const DropdownText = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.35);
`
export const DropdownIcon = styled.div`
    position: relative;
    margin-right: 12px;
    width: 15px;
    height: 18px;
`