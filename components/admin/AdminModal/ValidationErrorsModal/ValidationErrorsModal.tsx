import React, { useState } from "react"
import Button from "../../../button/button"
import AdminModal from "../AdminModal"
import {
	ModalTitle,
	ModalTitleContainer,
	SaveButtonsContainer,
} from "../AdminModal_styles"
import { Container, Textarea } from "../CommentModal/CommentModal_styles"
import {ErrorEntry, ErrorEntryButton} from "./ValidationErrorsModal_styles";

function ValidationErrorsModal(props) {
	const [validationErrors, setValidationErrors] = useState(props.validationErrors||"")
	return (
		<AdminModal height={600} open={true}>
			<Container>
				<ModalTitleContainer>
					<ModalTitle>Upload Errors</ModalTitle>
				</ModalTitleContainer>
				{validationErrors.map(e=>{
                    return(
                        <ErrorEntry key={e.message}>
                            {e.message+ ' '}
                            {e.message.includes(' An earnings report already exists for the specific user and month.') && <ErrorEntryButton onClick={()=>props.replaceExisting(e.filename)}>Replace Existing</ErrorEntryButton>}
                        </ErrorEntry>
                        
                    )
                })}
				<SaveButtonsContainer style={{ marginTop: "24px" }}>
					<Button
						onClick={props.close}
						style={{ marginLeft: "8px" }}
						theme={{
							backgroundColor: "#000",
							color: "#fff",
							padding: "10px 16px",
						}}
					>
						Okay
					</Button>
				</SaveButtonsContainer>
			</Container>
		</AdminModal>
	)
}

export default ValidationErrorsModal
