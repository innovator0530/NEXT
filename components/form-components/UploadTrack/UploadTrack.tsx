import {
    Container, Info, Title
}from "./UploadTrack_styles"
import InfoLabel from "../../frontend/CreateReleaseForms/InfoLabel"
import Button from "../../button/button"
import { createRef, FC, useState } from "react"
import { Soundtrack } from "../../../models/releases.models"
import { ErrorMessageContainer } from "../../frontend/CreateReleaseForms/CreateReleaseForms_styles"

const UploadTrack:FC<{addTrack:(files:File[])=>void}> = ({addTrack}) => {
    const fileInputRef = createRef<HTMLInputElement>()
    const handleUploadClick =(e) =>{
        e.preventDefault();
        (fileInputRef.current as any).click()
    }

    const [file, setFile] = useState<any>("")
    const [errorMessage, setErrorMessage] = useState<null|string>(null)

    const handleFileChange = (e)=>{
        console.log(e.target.files);
        addTrack(e.target.files)
    }


    return (
        <Container>
            <Title>Upload Tracks</Title>
            <InfoLabel style={{justifyContent:'center'}} fontColor="#ffffff59" labelText="Format: flac or wav" htmlFor="trackfile">
                Make sure all your music files have the correct format. You can convert your music here if you have the wrong format: <a href="https://online-audio-converter.com/" target="_blank">"click here"</a>
            </InfoLabel>
            <Info>
                Requirements: Minimum of 16 bit, 44.1 Khz, stereo <br/>/ Recommended 24 bits, 48Khz or 24 bits 96Khz
            </Info>
            <Button style={{margin: '24px auto 0 auto'}} onClick={handleUploadClick}>
                UPLOAD FROM MY COMPUTER
            </Button>
            {errorMessage && <ErrorMessageContainer style={{textAlign:'center',height:20}}>{errorMessage}</ErrorMessageContainer>}
            <input 
                multiple
                value={file}
                type="file" 
                style={{display:'none'}} 
                ref={fileInputRef} 
                onInput={handleFileChange} 
                name="trackfile" 
                accept="audio/wav,audio/flac,audio/x-wav"
            />
        </Container>
    )
}

export default UploadTrack
