import styled from "styled-components"

export const Ball = styled.div`
	position: absolute;

	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;

	background: rgb(255, 255, 255);
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.07) 100%
	);
	transition: all 200ms ease;
`

export const Spotify = styled(Ball)`
	top: 40vh;
	left: 5%;
	width: 145px;
	height: 145px;

	@media screen and (max-width: 800px) {
		top: 10vh;
		left: 5px;
		width: 90px;
		height: 90px;
	}
`

export const Youtube = styled(Ball)`
	top: 15vh;
	left: 7%;
	width: 110px;
	height: 110px;

	@media screen and (max-width: 800px) {
		top: 12vh;
		left: calc(50% - 35px);
		width: 70px;
		height: 70px;
	}
`

export const Apple = styled(Ball)`
	bottom: 6vh;
	left: 15%;
	width: 110px;
	height: 110px;

	@media screen and (max-width: 800px) {
		bottom: 12vh;

		width: 70px;
		height: 70px;
	}
`

export const Tidal = styled(Ball)`
	top: 30vh;
	right: 20%;
	width: 110px;
	height: 110px;

	@media screen and (max-width: 800px) {
		top: 14vh;
		right: 1px;
		width: 90px;
		height: 90px;
	}
`

export const Tiktok = styled(Ball)`
	top: 60vh;
	right: 12%;
	width: 145px;
	height: 145px;

	@media screen and (max-width: 800px) {
		top: 74vh;
		right: 8%;
		width: 100px;
		height: 100px;
	}
`

export const Insta = styled(Ball)`
	bottom: 10vh;
	right: 25%;
	width: 100px;
	height: 100px;

	@media screen and (max-width: 800px) {
		bottom: 6vh;
		right: 40%;
		width: 70px;
		height: 70px;
	}
`
