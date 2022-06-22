import styled from "styled-components"
import { TextGrey } from "../../../styles/styles"
import { HeaderLink } from "../header/header_style"

export const Container = styled.div`
	background-color: #141414;

	display: flex;
	align-items: center;
	justify-content: center;
`

export const InnerContainer = styled.div`
	width: 1000px;
	display: grid;
	grid-template-columns: 40% 30% 1fr 1fr;
	padding: 20px 0px 30px 0px;
	row-gap: 16px;

	@media screen and (max-width: 1000px) {
		padding: 20px;
	}

	@media screen and (max-width: 800px) {
		padding: 40px 24px 32px 24px;
		display: flex;
		flex-direction: column;
	}
`

export const FooterLink = styled(HeaderLink)`
	font-weight: 400;
	margin-top: 16px;
`

export const BottomGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	@media screen and (max-width: 800px) {
		flex-direction: column-reverse;
		align-items: stretch;
	}
`
