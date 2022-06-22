import {
	Container,
	IconButton,
	IconContainer,
	DropdownContent,
	DropdownOption,
	Input,
	DropdownContentScrollField,
	AddEntryContainer,
	AddIconContainer,
	Button,
	TextContainer,
} from "./DropdownInputEdit_styles"
import Image from "next/image"
import { createRef, useEffect, useState } from "react"

interface Entry {
	id: string
	label: string
}

function DropdownInputEdit({
	theme = {},
	value = "",
	onChange = (a) => {},
	buttonAction = () => {},
	onAddButtonClick = () => {},
	buttonText = "Something",
	style = {},
	name,
	placeholder = "",
	required = false,
	options,
	invalid = false,
	addButtonText = "Add New",
	containerStyle = {},
	hideButton,
}: {
	theme?: any
	value: string
	onChange: (id: string) => void
	buttonAction: (e?: any) => void
	onAddButtonClick: (e?: any) => void
	buttonText: string
	style?: any
	name: string
	placeholder: string
	required?: boolean
	options: Entry[]
	invalid: boolean
	addButtonText?: string
	containerStyle?: any
	hideButton?: boolean
}) {
	const [inputText, setInputText] = useState("")

	const [displayedOptions, setDisplayedOptions] =
		useState<{ id: string; label: string }[]>(options)

	const [open, setOpen] = useState<boolean>(false)

	const inputRef = createRef<HTMLInputElement>()

	const focus = () => {
		setOpen(true)
	}

	const blur = () => {
		setTimeout(() => setOpen(false), 200)
	}

	const clickDropdown = (e, entry: Entry) => {
		e.preventDefault()
		inputRef.current.blur()
		console.log(`entry`, entry)
		onChange(entry.id)
		setInputText(entry.label)
	}

	const clickDropdownAdd = (e) => {
		console.log("ADD")
		e.preventDefault()
		inputRef.current.blur()
		onAddButtonClick()
	}

	useEffect(() => {
		setInputText(value)
	}, [value])

	const inputChange = (e) => {
		const val = e.target.value
		if (val.length > 0) {
			const newOptions = options.filter((l) =>
				l.label.toLowerCase().includes(val.toLowerCase())
			)
			if (newOptions.length > 0) {
				setDisplayedOptions([...newOptions])
			} else {
				setDisplayedOptions([...options])
			}
		} else {
			setDisplayedOptions([...options])
		}
		const exactOptions = options.filter((l) => l.label === val)
		if (exactOptions.length === 1) {
			console.log("exactOptions", exactOptions)
			onChange(exactOptions[0].id)
		} else {
			onChange(val)
		}
		setInputText(val)
	}

	return (
		<Container style={containerStyle}>
			<Input
				theme={theme}
				ref={inputRef}
				invalid={invalid}
				style={style}
				onFocus={focus}
				onBlur={blur}
				className={"input " + (open ? "input-open" : "")}
				expanded
				required={required}
				value={inputText}
				name={name}
				onChange={inputChange}
				placeholder={placeholder}
			/>
			{/* <IconButton>
                <IconContainer >
                    <Image src="/icons/caret-down.svg" layout="fill"/>
                </IconContainer>
            </IconButton> */}
			{!hideButton && (
				<Button onClick={buttonAction}>
					<TextContainer>{buttonText}</TextContainer>
				</Button>
			)}
			<DropdownContent
				className={"dropdown-content " + (open ? "dropdown-content-open" : "")}
			>
				<DropdownContentScrollField>
					{displayedOptions.map((type, index, arr) => (
						<DropdownOption
							tabindex="-1"
							key={index}
							last={false}
							onClick={(e) => e.preventDefault()}
							onMouseDown={(e) => clickDropdown(e, type)}
						>
							{type.label}
						</DropdownOption>
					))}
					<DropdownOption
						tabindex="-1"
						last={false}
						onClick={(e) => e.preventDefault()}
						onMouseDown={(e) => clickDropdownAdd(e)}
					>
						<AddEntryContainer>
							<AddIconContainer>
								<Image src="/icons/Add.svg" layout="fill" />
							</AddIconContainer>
							{addButtonText}
						</AddEntryContainer>
					</DropdownOption>
				</DropdownContentScrollField>
			</DropdownContent>
		</Container>
	)
}

export default DropdownInputEdit
