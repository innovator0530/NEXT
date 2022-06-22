import React from "react"
import { HtmlButton } from "./button_style"

const Button = ({
	loading = false,
	children,
	disabled = false,
	disabledColor = "lightgrey",
	theme = undefined,
	...props
}) => {
	return (
		<HtmlButton
			theme={theme}
			disabled={disabled || loading}
			disabledColor={disabledColor}
			{...props}
		>
			{children}
		</HtmlButton>
	)
}

export default Button

Button.defaultProps = {
	theme: {
		backgroundColor: "white",
		color: "black",
	},
}
