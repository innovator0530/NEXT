import styled from "styled-components"

export const Container = styled.div`
	position: relative;
`

export const Button = styled.button`
	background: none;
	border: none;
	position: absolute;
	top: 0;
	right: 0;
    padding: 16px 24px;
    border-left: 1px solid #484848;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
	${props=>!props.disabled?`
	
	:active {
        color: rgba(255, 255, 255, 0.5);
		outline: none;
	}
    :focus {
		outline: none;
	}`:'color: rgba(255, 255, 255, 0.4);cursor: default;'}
`

export const TextContainer = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
`
