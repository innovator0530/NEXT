import { useState } from "react"
import { ReleaseArtist } from "../../../models/releases.models"
import InfoLabel from "../../frontend/CreateReleaseForms/InfoLabel"
import {
	ButtonContainer,
	Container,
	DividedContainer,
} from "./ArtistsSelector_styles"
import { FormGroup } from "../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import DropdownInput from "../DropdownInput/DropdownInput"
import { Input } from "../Form_styles"
import Button from "../../button/button"
import {ArtistTypes} from "../../../models/options/artistTypes"

function ArtistsSelector(props) {
	
	const minArtistCount: number = props.minArtistCount
	const value: ReleaseArtist[] = props.value
	const showInvalid: boolean = props.showInvalid
	const onChange: Function = props.onChange;

	const setArtistName = (index: number, newName: string) => {
		const newArtists = [...value]
		newArtists[index].name = newName
		onChange(newArtists)
	}

	const setArtistType = (index: number, newType: string) => {
		const newArtists = [...value]
		newArtists[index].type = newType
		onChange(newArtists)
	}

    const removeArtist = (e) =>{
        e.preventDefault();
        const newArtists = [...value];
        newArtists.pop();
        onChange(newArtists)
    }

    const addArtist = (e)=>{
        e.preventDefault();
        const newArtists = [...value];
        newArtists.push({type:'',name:''})
        onChange(newArtists)
    }

	return (
		<Container>
			<InfoLabel
				style={{ marginTop: "32px", marginBottom: "8px" }}
				labelText="Artist(s)"
				htmlFor=""
			>
				Enter the artist name. Primary refers to the main artist performing. Add
				others by clicking the “Add Artist” and selecting the type of artist
				involved in the new box. Please bear in mind that these artists (such as
				producers) are for the entire release. Track specific artists (such as
				feautures) can be added later.{" "}
			</InfoLabel>
			{value.map((artist, index) => (
				<DividedContainer key={index}>
					<FormGroup
						style={{ flexGrow: 1, paddingRight: "12px", marginTop: "8px" }}
					>
						<DropdownInput
							theme={props.theme}
							value={artist.type}
							options={ArtistTypes}
							placeholder="Type"
							name="artistType"
							invalid={showInvalid&&!ArtistTypes.includes(artist.type)}
							onChange={(e) => setArtistType(index, e)}
						/>
					</FormGroup>
					<FormGroup
						style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "8px" }}
					>
						<Input
							invalid={showInvalid&&artist.name.length <= 1}
							style={{ marginBottom: "0px", marginTop: "0px" }}
							name="title"
							type="text"
							placeholder="Artist Name"
							value={artist.name}
							onChange={(e) => setArtistName(index, e.target.value)}
						/>
					</FormGroup>
				</DividedContainer>
			))}
			<ButtonContainer>
				<Button
                    onClick={addArtist}
					theme={{
						backgroundColor: "#ffffff0C",
						color: "#ffffff59",
						fontWeight: 500,
						borderRadius: "8px",
						padding: "10px 12px",
					}}
                    style={{marginRight: '12px'}}
				>
					Add Artist
				</Button>
                {value.length > minArtistCount&&
				<Button
                    onClick = {removeArtist}
					theme={{
						backgroundColor: "#ffffff0C",
						color: "#ffffff59",
						fontWeight: 500,
						borderRadius: "8px",
						padding: "10px 12px",
					}}
				>
					Remove Artist
				</Button>}
			</ButtonContainer>
		</Container>
	)
}

export default ArtistsSelector
