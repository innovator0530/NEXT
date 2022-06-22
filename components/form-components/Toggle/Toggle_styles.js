import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    background-color: #141414;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
`

export const LeftButton = styled.button`
    background: ${props=>props.active?'#FFFFFF':'none'};
    border: none;
    border-color: rgba(255, 255, 255, 0.2);
    width: 50%;
    height: 100%;
    padding: 16px;
    border-radius: 11px 0 0 11px;
    color: ${props=>props.active?'#141414':'#FFFFFF'};
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }
`

export const RightButton = styled.button`
    background: ${props=>props.active?'#FFFFFF':'none'};
    border: none;
    width: 50%;
    height: 100%;
    padding: 16px;
    border-radius: 0 11px 11px 0;
    color: ${props=>props.active?'#141414':'#FFFFFF'};
    :active{
        outline: none;
    }
    :focus{
        outline: none;
    }
`

export const ButtonText = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;


`