import styled from "styled-components";


export const ListContainer = styled.div`

`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 40% auto 155px;
    color: #000000;
    opacity: 0.35;
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    margin-bottom: 16px;
    margin-top: 32px;
`

export const ListItemContainer = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #FFFFFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
    display: grid;
    grid-template-columns: 40% 40% 20%;
    height: 67px;
    margin-bottom: 12px;
    border-radius: 10px;
`

export const UserName = styled.div`
    line-height: 67px;
    padding-left: 24px;
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
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    display:flex;
    justify-content: center;
    align-items: center;

`