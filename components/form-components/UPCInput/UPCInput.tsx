import React, { useState } from "react"
import { Container, Button, TextContainer } from "./UPCInput_styles"
import { Input } from "../Form_styles"

function UPCInput({
	value,
	onChange,
	required = false,
	name,
	style = {},
	placeholder = "",
	onClick,
	invalid = false,
	disabled = false,
}) {
	const handleClick = (e) => {
		e.preventDefault()
		if (disabled) {
			return
		}
		onClick()
	}
	let displayedValue = value
	if (value === "auto") {
		displayedValue = ""
		placeholder = "Will be automatically generated"
	}
	return (
		<Container style={style}>
			<Input
				disabled={disabled}
				invalid={invalid}
				placeholder={placeholder}
				type="text"
				name={name}
				value={displayedValue}
				onChange={onChange}
				required={required}
			/>
			<Button disabled={disabled || value === "auto"} onClick={handleClick}>
				<TextContainer>Auto-Generate</TextContainer>
			</Button>
		</Container>
	)
}

export default UPCInput
