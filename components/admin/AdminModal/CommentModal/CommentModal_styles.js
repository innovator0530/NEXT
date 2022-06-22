import styled from "styled-components"

export const Container = styled.div`
	padding: 24px;
    width: 100%;
`

export const Textarea = styled.textarea`
	width: 100%;
	height: 240px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	border-radius: 8px;
	padding: 12px;
	font-size: 16px;
	line-height: 19px;
    color: '#212121';
    :focus{
        outline:none;
    }
    resize: none;
    overflow-y: auto;
`
