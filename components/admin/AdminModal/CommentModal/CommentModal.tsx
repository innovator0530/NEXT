import React, { useState } from "react"
import Button from "../../../button/button"
import AdminModal from "../AdminModal"
import {
	ModalTitle,
	ModalTitleContainer,
	SaveButtonsContainer,
} from "../AdminModal_styles"
import { Container, Textarea } from "./CommentModal_styles"

function CommentModal(props) {
	const [textAreaContent, setTextAreaContent] = useState(props.comment||"")
	const save = (e) => {
		e.preventDefault();
		props.save(textAreaContent)
	}
	return (
		<AdminModal height={400} open={props.visible}>
			<Container>
				<ModalTitleContainer>
					<ModalTitle>{props.title||'Edit Release Info'}</ModalTitle>
				</ModalTitleContainer>
				<Textarea value={textAreaContent} onChange={e=>setTextAreaContent(e.target.value)} type="textarea" placeholder="Your Message..."></Textarea>
				<SaveButtonsContainer style={{ marginTop: "24px" }}>
					<Button
						onClick={props.onCancel}
						theme={{
							backgroundColor: "#fff",
							color: "#212121",
							border: "1px solid rgba(0,0,0,0.2)",
							padding: "10px 16px",
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={save}
						style={{ marginLeft: "8px" }}
						theme={{
							backgroundColor: "#000",
							color: "#fff",
							padding: "10px 16px",
						}}
					>
						Save
					</Button>
				</SaveButtonsContainer>
			</Container>
		</AdminModal>
	)
}

export default CommentModal
