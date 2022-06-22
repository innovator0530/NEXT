import styled from "styled-components"
import { DarkGrey } from "../../../styles/styles"

export const Container = styled.div`
	background-color: ${DarkGrey};
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 100vh;
	/* padding-top: 160px; */
`

export const InnerContainer = styled.div`
	max-width: 1000px;
	align-self: center;
	padding-top: 150px;
	padding-bottom: 130px;

	display: flex;
	flex-direction: column;
`
