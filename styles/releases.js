import Link from "next/link"
import styled from "styled-components"
import { ReleaseStatus } from "../models/releases.models"

export const releaseStatusTextColor = {
	PENDING: "#E2E2EBCC",
	APPROVED: "#3E9C53",
	ACTION_NEEDED: "#BF9E49",
	ACTION_NEEDED_DRAFT: "#BF9E49",
	REJECTED: "#BF4949",
	DRAFT: "#898989",
}

export const releaseStatusBackgroundColor = {
	PENDING: "#E2E2EB19",
	APPROVED: "#1F893733",
	ACTION_NEEDED: "#BF9E4933",
	ACTION_NEEDED_DRAFT: "#BF9E4933",
	REJECTED: "#BF494933",
	DRAFT: "#4E4E4E33",
}

export const ComplexTitle = styled.div`
	display: flex;
	position: relative;
`

const ComplexTitleBackButtonA = styled.div`
	background-color: #0000;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 18px;
	color: #fff;
	opacity: 0.35;
	padding-right: 32px;
	height: 70px;
	margin: auto 0;
	transform: translateX(-100%);
	cursor: pointer;
	:hover {
		opacity: 0.5;
	}
	:focus {
		outline: none;
		text-decoration: underline;
	}
	@media (max-width: 1140px) {
		top: -50px;
		left: 100px;
	}
`

export const ComplexTitleBackButton = (props) => {
	return (
		<Link props={props} href={props.href}>
			<ComplexTitleBackButtonA style={props.style}>
				{props.children}
			</ComplexTitleBackButtonA>
		</Link>
	)
}

export const ComplexTitleStatusLabel = styled.div`
	margin: 0 8px;
	margin-top: 36px;
	color: ${(props) => releaseStatusTextColor[props.status]};
	font-weight: 500;
	font-size: 24px;
`
