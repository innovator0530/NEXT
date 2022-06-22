import styled from "styled-components"

export const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.35);
`

export const Modal = styled.div`
	position: fixed;
	height: auto;
	width: 448px;
	max-width: 100vw;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff;
	border: 1px solid rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	border-radius: 10px;
	padding: 24px;
`

export const ModalContent = styled.div``

export const Title = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: 0.025em;
	color: rgba(0, 0, 0, 0.35);
`
export const Email = styled.div`
	margin-top: 8px;
	font-size: 24px;
	line-height: 29px;
	text-align: center;
	color: #000000;
    margin-bottom: 16px;
`

export const Button = styled.button`
    width: 100%;
    height: 44px;
	border: none;
	background: #000000;
	border-radius: 6px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    cursor: pointer;
    :focus{
        outline: none;
        background: #333;
    }
    :hover{
        background: #222;
    }
    :active{
        background: #333;
    }

    transition: all .3s;
    margin-bottom: 8px;
`
export const ButtonWhite = styled.button`
    width: 100%;
    height: 44px;
	border: none;
	background: none;
	border-radius: 6px;
    letter-spacing: 0.01em;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    :focus{
        outline: none;
        text-decoration: underline;
    }
    :hover{
        color: rgba(0, 0, 0, 0.7);
    }
    :active{
        color: rgba(0, 0, 0, 0.2);
        text-decoration: none;
    }

    transition: all .3s;
    margin-bottom: 8px;
`