import {ListContainer, ListItemContainer, UserName,UserEmail, ListHeader, ButtonContainer } from "./NewUsersList_styles"
import {UserListUser} from "../../../pages/admin/users/new";
import Button from "../../button/button";

function NewUsersList(props) {
    const users:UserListUser[] = props.users;
    const checkOffUser = props.checkOffUser;
    const buttonText = props.buttonText;
    const firstTitle = (props.titles && props.titles[0]) || "Name";
    const secondTitle = (props.titles && props.titles[1]) || "E-Mail";
    return (
        <>
        <ListHeader>
            <div style={{paddingLeft:'24px'}}>{firstTitle}</div>
            <div>{secondTitle}</div>
        </ListHeader>
        <ListContainer>
            {users.map((user,index)=>{
                return(
                    <ListItemContainer key={user._id}>
                        <UserName>{((user.firstName||"")+" "+(user.lastName||""))||"No name"}</UserName>
                        <UserEmail>{user.email}</UserEmail>
                        <ButtonContainer>
                            <Button onClick={()=>checkOffUser(user)} theme={{padding: '10px 16px'}}>{buttonText}</Button>
                        </ButtonContainer>
                    </ListItemContainer>
                )
            })}
        </ListContainer>
        </>
    )
}

export default NewUsersList
