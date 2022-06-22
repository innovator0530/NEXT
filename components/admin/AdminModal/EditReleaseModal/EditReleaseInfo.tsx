import { useState } from "react"
import ArtistsSelector from "../../../form-components/ArtistsSelector/ArtistsSelector"
import DropdownInput from "../../../form-components/DropdownInput/DropdownInput"
import { Input } from "../../../form-components/Form_styles"
import { DividedContainer, FormGroup, Label } from "../../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import { genres as genreOptions } from "../../../../models/options/genres";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../../../styles/frontend"

function EditReleaseInfo({
    setTitle,
    title,
    label,
    setLabel,
    artists,
    setArtists,
    showInvalid,
    genres,
    setGenres
}) {
    return (
        <ThemeProvider theme={lightTheme}>
        <>
        {/* Release Title */}
            
			<FormGroup>
            <Label htmlFor="title">Release Title
            </Label>
            <Input
                invalid={showInvalid && title.length <= 0}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginTop: "16px", marginBottom: "12px" }}
                name="title"
                type="text"
                placeholder="Title"
            />
        </FormGroup>

        {/* Music Label */}
        <FormGroup>
            <Label labelText="Label*" htmlFor="label">Label
            </Label>
            <Input
                invalid={showInvalid && label.length <= 0}
                style={{ marginTop: "16px", marginBottom: "12px" }}
                name="title"
                type="text"
                placeholder="Your Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
            />
        </FormGroup>

        {/* Artists */}

			<ArtistsSelector
                theme={lightTheme}
				minArtistCount={1}
				value={artists}
				onChange={setArtists}
				showInvalid={showInvalid}
			/>

        {/* Primary / Secondary Genre */}
			<DividedContainer>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<Label
						htmlFor="primaryGenre"
					>
						Primary Genre
					</Label>
					<DropdownInput
                        theme={lightTheme}
						style={{ marginTop: "16px" }}
						invalid={showInvalid && !genres.includes(genres[0])}
						options={genreOptions}
						name="primaryGenre"
						placeholder="Your genre"
						value={genres[0]||""}
						onChange={(v)=>{
                            const newGenres = [...genres];
                            newGenres[0] = v;
                            setGenres(newGenres)
                        }}
					/>
				</FormGroup>
				<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
					<Label
						labelText="Secondary genre"
						htmlFor="secondaryGenre"
					>
                        Secondary genre
					</Label>
					<DropdownInput
                        theme={lightTheme}
						style={{ marginTop: "16px" }}
						name="secondaryGenre"
						options={genreOptions}
						placeholder="Your genre"
						value={genres[1]||""}
                        onChange={(v)=>{
                            const newGenres = [...genres];
                            newGenres[1] = v;
                            setGenres(newGenres)
                        }}
					/>
				</FormGroup>
			</DividedContainer>
        </>
        </ThemeProvider>
    )
}

export default EditReleaseInfo
