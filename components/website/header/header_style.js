import Link from "next/link"
import styled from "styled-components"
import { HorizontalGroup, TextGrey } from "../../../styles/styles"

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	padding: 28px 0;
	z-index: 10;
`

export const InnerContainer = styled.div`
	max-width: 1000px;

	display: flex;
	flex: 1;

	@media (max-width: 1000px) {
		width: 100%;
		padding: 0 20px;
	}

	@media screen and (max-width: 800px) {
		padding: 24px;

		transition: all 200ms ease;
		flex-direction: column;
		overflow: hidden;

		height: ${(props) => (props.isMenuVisible ? "100vh" : "70px")};
	}
`

export const HeaderLink = styled.div`
	font-size: 16;
	font-weight: 500;
	color: #fff;
	text-decoration: none;
	cursor: pointer;
	transition: opacity 400ms ease;
	opacity: ${(props) => (props.active ? 1 : 0.4)};

	:hover {
		opacity: 1;
	}
`

export const ResponsiveHorizontalGroup = styled(HorizontalGroup)`
	> * {
		margin-left: ${(props) => (props.spacing ? props.spacing : "none")};
		margin-bottom: none;
	}

	& :first-child {
		margin-left: ${(props) => (props.spacing ? 0 : "none")};
		margin-bottom: none;
	}

	@media screen and (max-width: 800px) {
		flex-direction: column;
		align-self: stretch;

		> * {
			margin-left: 0;
			margin-bottom: ${(props) =>
				props.verticalSpacing ? props.verticalSpacing : "none"};
		}

		& :last-child {
			margin-left: 0;
			margin-bottom: ${(props) => (props.verticalSpacing ? 0 : "none")};
		}
	}
`

export const HeaderContent = styled(ResponsiveHorizontalGroup)`
	justify-content: space-between;
	flex-direction: row;
	flex: 1;
	z-index: 1;

	@media screen and (max-width: 800px) {
		margin-top: 24px;
		flex-direction: column-reverse;
	}
`

export const Links = styled(ResponsiveHorizontalGroup)`
	@media screen and (max-width: 800px) {
		align-items: center;
		font-size: 36px;
	}
`
