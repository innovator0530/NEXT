import { lightTheme } from "../../../styles/frontend";
import {Modal, ModalContainer, ModalMain, ModalSide} from "./AdminModal_styles";
import { ThemeProvider } from "styled-components";

function AdminModal({open,children,height=null}) {
    return (
        <ThemeProvider style={{width:'100%',height:'100%'}} theme={lightTheme}>
            <ModalContainer open={open}>
                <Modal open={open}  height={height}>
                    {children}
                </Modal>
            </ModalContainer>
        </ThemeProvider>
    )
}

export default AdminModal
