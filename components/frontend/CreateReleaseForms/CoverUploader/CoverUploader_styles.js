import styled from "styled-components";

export const Container = styled.div`
    margin-top: 34px;
    background: #141414;
    border-radius: 14px;
    padding: 24px;
`

export const InnerContainer = styled.div`
    display: flex;
`

export const LoadingOverlay = styled.div`
    opacity: 0;
    z-index: 400;
    background-color: #0004;
    transition: opacity .3;
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoadingSpinner = styled.div`

    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 4px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    div:nth-child(2) {
        animation-delay: -0.3s;
    }
    div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
`

export const CoverContainer = styled.div`
    .loading{
        opacity: 1;
    }
    img{
        width: 100%;
        height: 100%;
        position:absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    position: relative;
    width: 40%;
    
    background: #222222;
    ::after{
        padding-bottom: 100%;
        content: "";
        display: block;
    }
    
`

export const CoverDescriptionsContainer = styled.div`
    width: 60%;
    padding-left: 32px;
    padding-top: 7px;
`
export const CoverDescriptionsList = styled.ul`
    line-height: 28px;
    list-style: none;
    color: #FFFFFF;
    opacity: 0.5;
    margin-top: 16px;
`

export const CoverComment = styled.div`
    color: #FFFFFF;
    opacity: 0.2;
    font-size: 14px;
    line-height: 17px;
    margin-top: 6px;
    margin-bottom: 16px;
`