import { useState } from "react"
import { ReleaseArtist } from "../../../models/releases.models"
import InfoLabel from "../../frontend/CreateReleaseForms/InfoLabel"
import {
	ButtonContainer,
	Container,
	DividedContainer,
} from "./LinkSelector_styles"
import { FormGroup } from "../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import DropdownInput from "../DropdownInput/DropdownInput"
import { Input } from "../Form_styles"
import Button from "../../button/button"
import {ArtistTypes} from "../../../models/options/artistTypes"
import { Input2 } from "../../../styles/styles"

function LinkSelector(props) {
	const value: string[] = props.value
	const showInvalid: boolean = props.showInvalid
	const onChange: Function = props.onChange;

	const linkChange = (e,index)=>{
		const newLinks = [...value];
		newLinks[index] = e.target.value;
		onChange(newLinks)
	}

	const addLink = (e)=>{
		e.preventDefault();
		const newLinks = [...value];
		newLinks.push('');
		onChange(newLinks);
	}

	const removeLink = (e)=>{
		e.preventDefault();
		const newLinks = [...value];
		newLinks.pop();
		onChange(newLinks);
	}

	return (
		<Container>
			{value.map((link, index) => (
				<Input2
					key={index}
					value={link}
					type="text"
					onChange={(e)=>linkChange(e,index)}
					placeholder="Link"
				/>
			))}
			<ButtonContainer>
				<Button
					disabled={value[value.length-1]?.length<=0}
                    onClick={addLink}
					theme={{
						backgroundColor: "#ffffff0C",
						color: "#ffffff59",
						fontWeight: 500,
						borderRadius: "8px",
						padding: "10px 12px",
					}}
                    style={{marginRight: '12px'}}
				>
					Add Link
				</Button>
                {value.length > 1 &&
				<Button
                    onClick = {removeLink}
					theme={{
						backgroundColor: "#ffffff0C",
						color: "#ffffff59",
						fontWeight: 500,
						borderRadius: "8px",
						padding: "10px 12px",
					}}
				>
					Remove Link
				</Button>}
			</ButtonContainer>
		</Container>
	)
}

export default LinkSelector
