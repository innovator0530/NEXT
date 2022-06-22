import styled from "styled-components"


export const NavContainer = styled.nav`
    height: ${props=>props.dark?'104px':'89px'};
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-shadow:${props=>props.theme.boxShadow} ;
    background-color:${(props)=>props.theme.header.backgroundColor};
    align-items: center;
    border-bottom: ${props=> props.theme.header?props.theme.header.borderBottom:'none'};
`

export const NavList = styled.ul`
    display:flex;
    height: 100%;
`

export const NavItem = styled.li`
    cursor: pointer;
    display:flex;
    align-items: center;
    justify-content:center;
    list-style: none;
    height:100%;
    min-width: 123px;
    padding: 0 20px;
    border-top: 3px solid ${props=>props.active?(props.theme.header.activeBarColor):'#0000'};
    border-bottom: 3px solid #0000;
    color: ${props=>props.theme.header.fontColor};
    opacity: ${props=>props.active?'1':'.35'};
    :focus, :hover{
        color: ${props=>props.theme.header.hoverColor};
    }
`

export const BrandImageContainer = styled.div`
    margin: 0 40px;
    font-size: 10px;
    color: #21212177;
    text-transform: uppercase;
    span{
        color:${props=>props.theme.header.fontColor};
        margin-left:10px;
    }
`

export const ActionButton = styled.button`
    text-transform: uppercase;
    background-color: inherit;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    width: 244px;
    height: 45px;
    border: 1.35px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 16px;
    :focus{
        outline: none;
        color: #000;
        background-color: #fff;
    }
    :hover{
        color: #000;
        background-color: #fff;
    }
    :active{
        color: #fff;
        background-color: #000;
    }
    transition: color, background-color 0.3s;
    margin-right: 40px;
    cursor: pointer;
`