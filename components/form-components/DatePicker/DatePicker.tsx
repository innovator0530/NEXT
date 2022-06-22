import React, { useState } from "react"
import { Container, IconButton, IconContainer, DatePickerWrapperStyles } from "./DatePicker_styles"
import { Input } from "../Form_styles"
import Image from "next/image"
import ReactDatePicker from "react-datepicker"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
 import en from "date-fns/locale/en-GB"
 registerLocale("en", en)

function DatePicker({ value, onChange, required = false, name, style = {} }) {
	//const [startDate, setStartDate] = useState(new Date())
	const handleClick = (e) => {
		e.preventDefault()
	}
	return (
		<Container style={style}>
			<ReactDatePicker
                formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
                locale="en"
                wrapperClassName='date_picker full-width'
                dateFormat="dd.MM.yyyy"
                customInput={<Input required={required} />}
				selected={value}
				onChange={(date) => onChange(date)}
			/>
            <DatePickerWrapperStyles />
			{/* 
            <IconButton onClick={handleClick}>
                <IconContainer>
                    <Image src="/icons/calendar.svg" layout="fill"/>
                </IconContainer>
            </IconButton> */}
		</Container>
	)
}

export default DatePicker
