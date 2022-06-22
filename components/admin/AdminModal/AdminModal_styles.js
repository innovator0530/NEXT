import styled from "styled-components";


export const ModalContainer = styled.div`
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props=>props.open?'rgba(0,0,0,.1)':'rgba(0,0,0,0)'};
    display: ${props=>props.open?'flex':'none'};
    z-index: ${props=>props.open?'400':'-1000'};
    justify-content: center;
    transition: background-color .3s;
`

export const Modal = styled.div`
    position:fixed;
    height: auto;
    opacity: ${props=>props.open?'1':'0'};
    display: flex;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #fff;
    width: 800px;
    
    max-width: 100%;
    top:50%;
  left:50%;
  transform: translate(-50%,-50%);
    //margin-top: 10vh;
    /* transform: ${props=>props.open?'translateY(-50%)':'translateY(-60%)'}; */
    border-radius: 12px;
    transition: opacity .5s;
`
export const ModalSide = styled.div`
    width: 25%;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    background: #FAFAFA;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
`

export const ModalMain = styled.div`
    padding: 24px 24px 16px 24px;
    width: 75%;
    height: auto;
    max-height: 90vh;
    overflow-y: auto;
`

export const SideNavigationContainer = styled.div`
    padding: 37px 20px;
`

export const SideButton = styled.button`
    cursor: pointer;
    margin-bottom: 12px;
    color: #000000;
    opacity: 0.8;
    border: none;
    background: ${props=>props.active?'rgba(0, 0, 0, 0.05)':'none'};
    border-radius: 8px;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    outline: none;
    padding: 10px 12px;
    :hover{
        background: rgba(0, 0, 0, 0.01);
    }
    :active{
        background: rgba(0, 0, 0, 0.05);
    }
    :focus{
        outline: none;
    }

`

export const ModalTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
` 

export const ModalTitle = styled.h2`
    color: #212121;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
`

export const CloseCross = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    width: 24px;
    height: 24px;
    position: relative;
    margin-top: -6px;
    
    .bar{
        position: absolute;
        left: 11px;
        width: 2.35px;
        height: 17.44px;
        border-radius: 20px;
        background: #C4C4C4;
        transform: rotate(45deg);
        transition: all .3s;
    }
    :hover{
        .bar{
            background: #777;
        }
    }
    :active{
        .bar{
            background: #C4C4C4;
        }
    }
    .angled{
        transform: rotate(-45deg);
    }
`


export const SaveButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`