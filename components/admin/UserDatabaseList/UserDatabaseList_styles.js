import styled from "styled-components"

export const Container = styled.div`
	margin-top: 40px;
`

export const ListHeader = styled.div`
	display: grid;
	grid-template-columns: 28% 11% 10% 10% 10% 10% 10% 11%;
	color: #000000;
	opacity: 0.35;
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	margin-bottom: 8px;
`

export const ListRow = styled.div`
    cursor: pointer;
	display: grid;
	grid-template-columns: 28% 11% 10% 10% 10% 10% 10% 11%;
	color: #000000;
	opacity: 0.8;
	padding: 24px 14px;
	margin: 0 -14px;
	border-radius: 14px;
	:hover {
		background: rgba(0, 0, 0, 0.025);
	}
    :active{
        background: rgba(0, 0, 0, 0.05);
    }
    :hover .caret{
        display: block;
    }
    position: relative;
`

export const Divider = styled.hr`
	height: 1px;
    border: none;
	background: rgba(0, 0, 0, 0.15);
	margin: 0;
`
export const ListEntry = styled.div`
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.005em;
	color: #000000;
	opacity: 0.8;
`
export const ListEntryCaret = styled.div`
    display: none;
    opacity: .35;
    position: absolute;
    right: 11px;
    top: 25px;
`