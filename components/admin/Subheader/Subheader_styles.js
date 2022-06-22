import styled from "styled-components";

export const Container = styled.nav`
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), #FFFFFF;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
    //border-bottom: 1px solid #e1e1e1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
`

export const ContentContainer = styled.ul`
    list-style: none;
    width: 1020px;
    padding: 0 15px;
    max-width: 100%;
    display: flex;
`

export const NavItem = styled.li`
    font-size: 16px;
    line-height: 19px;
    color: #212121;
    margin-right: 40px;
    opacity: ${props=>props.active?'1':'.35'};
    :hover{
        opacity: ${props=>props.active?'1':'.5'};
    }
    :active{
        opacity: 1;
    }
`