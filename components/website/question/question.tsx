import React, { useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"
import { HorizontalGroup, VerticalGroup } from "../../../styles/styles"

const Question = ({ question, answer, open, onClick }) => {
	const text = useRef<HTMLParagraphElement>(null)
	const height = useRef<number>(0)

	useLayoutEffect(() => {
		if (text.current) {
			height.current = text.current.offsetHeight
		}
	}, [text])

	return (
		<>
			<HorizontalGroup
				justify="space-between"
				onClick={onClick}
				style={{ margin: "10px 0", cursor: "pointer" }}
			>
				<h5>{question}</h5>
				<img
					src="/chevron.svg"
					style={{
						marginLeft: "10px",
						transform: open ? "rotate(0deg)" : "rotate(180deg)",
						transition: "all 200ms ease",
					}}
				/>
			</HorizontalGroup>
			<div
				style={{
					maxWidth: "480px",
					color: "white",
					height: height.current ? (open ? height.current + "px" : 0) : "0",
					fontSize: "18px",
					overflow: "hidden",
					transition: "height 400ms ease",
					perspective: "600px",
				}}
			>
				<p
					ref={text}
					style={{
						color: "gray",
						transform: open ? "rotateX(0deg)" : "rotateX(-90deg)",

						transition: "all 300ms ease",
						transitionDelay: open ? "100ms" : "0ms",
						transformOrigin: "0 0",
					}}
				>
					{answer}
				</p>
			</div>
		</>
	)
}

export default Question
