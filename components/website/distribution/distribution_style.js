import styled, { keyframes } from "styled-components"
import { VerticalGroup } from "../../../styles/styles"

const fadeIn = keyframes`
	0% {
		background-position-x: 0%;
	}
	100% {
		background-position-x: 100%;
	}
`

export const Container = styled(VerticalGroup)`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 20px;

	background-image: url("/bubblesSlider.svg");
	background-repeat: no-repeat;
	background-position-y: bottom;
	/* background-size: 300%; */
	animation: 30s ${fadeIn} infinite alternate linear;

	align-items: center;
	padding-top: 140px;

	@media screen and (max-width: 800px) {
		animation-duration: 90s;
		padding-top: 100px;
	}
`
