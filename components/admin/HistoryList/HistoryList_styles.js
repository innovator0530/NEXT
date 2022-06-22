import styled from "styled-components";


export const ListContainer = styled.div`

`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 40% 30% 30%;
    color: #000000;
    opacity: 0.35;
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    margin-top: 32px;
`

export const ListItemContainer = styled.div`
    border-bottom: ${props=>props.last?'none':'1px solid rgba(0, 0, 0, 0.15)'};
    display: grid;
    grid-template-columns: 40% 30% 30%;
    height: 68px;
    margin-bottom: 12px;
`

export const UserName = styled.div`
    line-height: 67px;
    font-size: 16px;
    color: #000000;
    opacity: 0.8;
`

export const UserEmail = styled.div`
    line-height: 67px;
    font-size: 16px;
    color: #000000;
    opacity: 0.8;
`

export const ButtonContainer = styled.div`
    height: 67px;
    display:flex;
    align-items: center;

`