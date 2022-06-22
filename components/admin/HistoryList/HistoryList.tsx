import {ListContainer, ListItemContainer, UserName,UserEmail, ListHeader, ButtonContainer } from "./HistoryList_styles"
import {UserListUser} from "../../../pages/admin/users/new";
import Button from "../../button/button";

function HistoryList(props) {
    const users:UserListUser[] = props.users;
    const checkOffUser = props.checkOffUser;
    return (
        <>
        <ListHeader>
            <div >{props.titles[0]}</div>
            <div>{props.titles[1]}</div>
            <div>{props.titles[2]}</div>
        </ListHeader>
        <ListContainer>
            {users.map((user,index)=>{
                return(
                    <ListItemContainer last={index==(users.length-1)} key={user._id}>
                        <UserName>{((user.firstName||"")+" "+(user.lastName||""))||"No name"}</UserName>
                        <UserEmail>{user.email}</UserEmail>
                        <ButtonContainer>
                            {user.thirdColumn || (user.createdAt ? new Date(user.createdAt).toLocaleDateString('de-DE'):"")}
                        </ButtonContainer>
                    </ListItemContainer>
                )
            })}
        </ListContainer>
        </>
    )
}

export default HistoryList
