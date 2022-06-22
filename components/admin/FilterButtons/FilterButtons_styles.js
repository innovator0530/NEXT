import styled from "styled-components";

export const Container = styled.div`
    display:inline-flex;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
`

export const Option = styled.button`
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    background: none;
    border: none;
    cursor: pointer;
    color: #000000;
    opacity: ${props=>props.active?'1':'.35'};
    /* border-bottom: ${props=>props.active?'3px solid #000000':'none'}; */
    border-bottom-left-radius: ${props=>props.first?'8px':'0'};
    border-bottom-right-radius: ${props=>props.last?'8px':'0'};
    border-right: ${props=>props.last?'none':'1px solid #E5E5E5'};
    padding: 12px 24px;
    position: relative;
    .active-marker{
        display: ${props=>props.active?'block':'none'};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #000000;
        border-bottom-right-radius: ${props=>props.last?'8px':'0'};
        border-bottom-left-radius: ${props=>props.first?'8px':'0'};
    }
    :focus{
        outline: none;
        opacity: 1; 
    }
    :hover{
        opacity: ${props=>props.active?'1':'.6'};
    }
    :active{
        opacity: ${props=>props.active?'1':'.35'};
    }
    transition: all .1s;
`