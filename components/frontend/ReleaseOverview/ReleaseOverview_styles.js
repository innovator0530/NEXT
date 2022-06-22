import styled from "styled-components"

export const ColumnContainer = styled.div`
	display: flex;
	margin-top: 24px;
	flex-wrap: wrap;
	margin-bottom: 10px;
`

export const LeftColumn = styled.div`
	width: 50%;
	min-width: 350px;
	flex-grow: 1;
	padding-right: 19px;
	@media (max-width: 980px) {
		width: 100%;
		padding: 0;
	}
`

export const RightColumn = styled.div`
	width: 50%;
	min-width: 350px;
	flex-grow: 1;
	padding-left: 19px;
	@media (max-width: 980px) {
		width: 100%;
		padding: 0;
	}
`

export const AttributeContainer = styled.section`
	margin-bottom: 24px;
`

export const AttributeLabel = styled.div`
	font-weight: 600;
	color: ${(props) => props.theme.baseFontColor};
	opacity: 0.28;
	font-size: 14px;
	line-height: 17px;
	margin-bottom: 8px;
`

export const AttributeValue = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: ${(props) => props.theme.baseFontColor};
	opacity: 0.8;
	${props=>props.wrapWord?` 
		white-space: pre-wrap; /* CSS3 */
		white-space: -moz-pre-wrap; /* Firefox */
		white-space: -pre-wrap; /* Opera <7 */
		white-space: -o-pre-wrap; /* Opera 7 */
		word-wrap: break-word; /* IE */
	`:''}
`
export const DividerLine = styled.hr`
	background-color: ${(props) => props.theme.baseFontColor};
	opacity: 0.1;
	height: 1px;
`

export const ReleaseCoverContainer = styled.div`
	width: 100%;
	padding-top: 100%;
	position: relative;
	background: ${(props) => props.theme.baseFontColor + "19"};
`

export const StoresOptionsLine = styled.div`
	display: flex;
	height: 26.8px;
`

export const StoresButton = styled.button`
	background: rgba(255, 255, 255, 0.04);
	border-radius: 10px;
	color: rgba(255, 255, 255, 0.5);
	font-size: 12px;
	height: 25px;
	padding: 5px 10px;
	border: none;
	margin-top: -8px;
	margin-left: 8px;
	cursor: pointer;
	:hover {
		background: rgba(255, 255, 255, 0.02);
	}
	:active {
		background: rgba(255, 255, 255, 0.04);
	}
	transition: all 0.3s;
	:focus {
		outline: none;
	}
	small {
		font-size: 8px;
		line-height: 15px;
	}
`

export const GoToUserButton = styled.button`
	border: none;
	outline: none;
	font-weight: 500;
	color: #000;
	border-radius: 10px;
	padding: 5px 10px;
	background: rgba(0, 0, 0, 0.04);
	font-size: 14px;
	height: 27px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 7px;
	margin-top: -3px;
	cursor: pointer;
	:focus {
		outline: none;
	}
	:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`
