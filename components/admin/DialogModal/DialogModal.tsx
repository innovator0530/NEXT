
import {ModalBackground, Modal, Title, Email, Button, ButtonWhite} from "./DialogModal_styles"

function DialogModal({onConfirm,onCancel,email,open,title}) {
    return (
        <ModalBackground>
            <Modal>
                <Title>{title}</Title>
                <Email>{email}</Email>
                <Button onClick={onConfirm} tabIndex={open?"1":"0"}>Confirm</Button>
                <ButtonWhite onClick={onCancel} tabIndex={open?"2":"0"}>Cancel</ButtonWhite>
            </Modal>
            
        </ModalBackground>
    )
}

export default DialogModal
