import {
	Container,
	CoverContainer,
	InnerContainer,
	CoverDescriptionsContainer,
	CoverDescriptionsList,
	CoverComment,
	LoadingOverlay,
	LoadingSpinner,
} from "./CoverUploader_styles"
import Image from "next/image"
import InfoLabel from "../InfoLabel"
import Link from "next/link"
import Button from "../../../button/button"
import { createRef, SyntheticEvent, useContext, useRef, useState } from "react"
import { server } from "../../../../config"
import { ErrorMessageContainer } from "../CreateReleaseForms_styles"
import { CreateReleaseContext } from "../../../../context/CreateReleaseState/CreateReleaseState"


const minCoverSize = 3000;
const maxCoverSize = 5000;

function CoverUploader(props) {
	const { cover, coverFileRead, coverFileSelected, coverFileUploaded } = useContext(CreateReleaseContext)


	const fileInputRef = useRef();

	const uploadImage = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('image', file);
			const res = await fetch(`${server}/api/releases/asset`, {
				method: 'POST',
				body: formData
			})
			if (Math.floor(res.status / 100) === 2) {
				const json = await res.json();
				console.log(`json`, json)
				if (json.filesValid) {
					coverFileUploaded(true,json.urls[0])
				}
				else {
					coverFileUploaded(false, null, json.message);
				}
			}
		}
		catch (e) {
			coverFileUploaded(false,null, 'Upload failed.')
			console.log(e)
		}
	}

	const handleInput = (e) => {
		const files = e.target.files;
		if (FileReader && files && files.length) {
			coverFileSelected();
			var fr = new FileReader();
			fr.onload = function () {
				console.log("COver file read")
				coverFileRead(fr.result.toString())
			}
			fr.readAsDataURL(files[0]);
			uploadImage(files[0]);
		}
	}

	const uploadFile = (e) => {
		e.preventDefault();
		if (!fileInputRef.current) return;
		(fileInputRef.current as any).click()
	}

	return (
		<Container>
			<InnerContainer>
				<CoverContainer>
					{(!cover.uploading && (cover.localDataURL || cover.fileUrl)) && <Image src={cover.localDataURL || cover.fileUrl} layout="fill" />}
					<LoadingOverlay className={cover.uploading ? "loading" : ""}>
						<LoadingSpinner>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</LoadingSpinner>
					</LoadingOverlay>
				</CoverContainer>
				<CoverDescriptionsContainer>
					<InfoLabel labelText="Upload a cover" htmlFor="cover">
						Upload the cover art here. Make sure you follow the guidelines below and the Content Style Guide. For more information
						concerning the cover art,{" "}
						<a href="https://support.rewave.ch/hc/en-us/articles/360012502320-Content-Style-Guide-MUST-READ-#h_8226960883011545317621057" target="_blank">
							click here
						</a>
						.
					</InfoLabel>
					<CoverDescriptionsList>
						<li>- Square</li>
						<li>- Minimum size 3000 x 3000 pixels</li>
						<li>- Maximum size: 5000 x 5000 pixels</li>
						<li>- Format: jpg, tiff or png </li>
						<li>- Mode RGB</li>
						<li>- Max. 36Mb</li>
					</CoverDescriptionsList>
					<CoverComment>
						*Make sure the cover matches exactly the release data (title,
						artist name, label name etc.) Do not forget to add the "Parental Advisory" Label if your
						release contains explicit material)
					</CoverComment>
					<div style={{ display: 'flex', alignItems: 'center'}}>
						<Button style={{ minWidth: '50%' }} onClick={uploadFile}>UPLOAD COVER</Button>
						<ErrorMessageContainer style={{ height: '40px', lineHeight:'40px', transform:'translateY(-7px)', marginLeft: '10px', textAlign: 'left' }}>
							<span style={{display:'inline-block',verticalAlign:'middle',lineHeight:'normal'}}>{cover.validationMessage}</span>
						</ErrorMessageContainer>
					</div>

					<input
						style={{ display: "none" }}
						type="file"
						onInput={handleInput}
						accept="image/*"
						ref={fileInputRef}
					/>
				</CoverDescriptionsContainer>
			</InnerContainer>
		</Container>
	)
}

export default CoverUploader
