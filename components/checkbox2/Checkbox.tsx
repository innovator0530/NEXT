import { FinalCheckbox, Container, LabelText } from "./Checkbox_style"

function Checkbox({checked, onChange,label}) {
	return (
		<Container>
			<label>
				<FinalCheckbox
					className="hello"
					checked={checked}
					onChange={onChange}
				/>
				<LabelText>{label}</LabelText>
			</label>
		</Container>
	)
}

export default Checkbox
