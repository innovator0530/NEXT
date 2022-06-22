import styled from "styled-components"

export const TagsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`

export const TagButton = styled.button`
    color: ${(props)=>props.active?'#1E1D1D':'#777'};
    font-size: 14px;
    line-height: 17px;
    padding: 12px 16px;
    ${props=>props.active?'border: none;':'border: 1px solid rgba(255, 255, 255, 0.1);'}
    background-color: ${props=>props.active?'#fff':'#0000'};
    border-radius: 40px;
    margin-right: 12px;
    :hover{
        ${props=>props.active?'':'color: #fff;'}
        border-color: #fff;
    }
    :focus{
        outline: none;
        ${props=>props.active?'':'color: #fff;'}
        border-color: ${props=>props.active?'#1E1D1D':'#fff'};
    }
`