import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    align-items: center;



    /* :hover .dropdown-content{
        display: block;
        opacity: 1;
        height: inherit;
        z-index: 400;
    } */
    /* :hover .input{
        
        :focus{
            border-bottom-color: rgba(255, 255, 255, 0.2) !important;
        }
    } */
    .input-open{
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-color: rgba(255, 255, 255, 0.2) !important;

        outline:none;
        border-color: ${props=>props.theme.input?props.theme.input.borderColorFocus:'#fff'};
    }
    .dropdown-content-open{
        border-color: ${props=>props.theme.input?props.theme.input.borderColorFocus:'#fff'};
        display: block;
        opacity: 1;
        height: inherit;
        z-index: 1000;
    }
    
`


export const IconButton = styled.div`
    background-color: none;
    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 56px;
    position: absolute; 
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const IconContainer = styled.div`
    width: 10px;
    height: 5px;
    position: relative;
`

export const DropdownContent = styled.div`
    //display:none;
    width: 100%;
    position:absolute;
    background: ${props=>props.theme.input?props.theme.input.background:'#151515'};
    border: 0.5px solid ${props=>props.theme.input?props.theme.input.borderColor: 'rgba(255, 255, 255, 0.05)'};
    box-sizing: border-box;
    box-shadow: 0px 2px 14px ${props=>props.theme.input?props.theme.input.boxShadowColor || '#0000': 'rgba(0, 0, 0, 0.65)'};
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top-width: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 0 8px;
    z-index: -400;
    opacity:0;
    height: 0;
    transition: opacity .3s linear;
    
    
    
`

export const DropdownContentScrollField = styled.div`
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 6px;
        
    }
    ::-webkit-scrollbar-track{
        background: rgba(255, 255, 255, 0.1);
        border-radius: 32px;
        margin: 8px 0;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props=>props.theme.scrollThumbColor||'#fff'};
        border-radius: 32px;
    }
    padding-right: 8px;
    max-height: 250px;
`

export const DropdownOption = styled.button`
    text-align: left;
    display: block;
    background: none;
    width: 100%;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: ${props=>props.theme.input?props.theme.input.fontColor:'rgba(255, 255, 255, 0.5)'};
    padding: 16px 15px;
    cursor: pointer;
    :hover{
        color: ${props=>props.theme.fontColorHover||'rgba(255, 255, 255, 0.8)'};
    }
    :focus{
        outline: none;
        color: rgba(255, 255, 255, 0.8);
        ${props=>props.theme.input?props.theme.input.fontColor:'rgba(255, 255, 255, 0.5)'};
    }
    ${props=>props.last?'':`
        border: 0px solid rgba(255, 255, 255, 0.2);
        border-bottom-width: 1px;
    `}
`

export const AddEntryContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const AddIconContainer = styled.div`
    position:relative;
    margin-right: 4px;
    width: 10px;
    height: 10px;
    cursor: pointer;
`

export const TextContainer = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
`



export const Input = styled.input`
    width: 100%;
    background: ${props=>props.theme&&props.theme.input?props.theme.input.backgound :'#141414'};
    border: 1px solid ${props=>props.theme && props.theme.input ? props.theme.input.borderColor :'rgba(255, 255, 255, 0.2)'};
    box-sizing: border-box;
    border-radius: 12px;
    padding: 15px 24px;
    color: ${props=>props.theme&&props.theme.fontColor?props.theme.fontColor:'#fff'};
    font-size: 16px;
    line-height: 16px;
    transition: all linear .3s;
    //transition:  linear .3s;
    /* :hover{
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    } */
    
    :focus{
        outline: none;
    }
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        opacity: 0.5;
    }
    ::-moz-placeholder { /* Firefox 19+ */
        opacity: 0.5;
    }
    :-ms-input-placeholder { /* IE 10+ */
        opacity: 0.5;
    }
    :-moz-placeholder { /* Firefox 18- */
        opacity: 0.5;
    }
    ${props=>props.invalid?'border-color: #E25E43;':''}
`

export const Button = styled.button`
	background: none;
	border: none;
	position: absolute;
	top: 0;
	right: 0;
    padding: 16px 24px;
    border-left: 1px solid #484848;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
	${props=>!props.disabled?`
	
	:active {
        color: rgba(255, 255, 255, 0.5);
		outline: none;
	}
    :focus {
		outline: none;
	}`:'color: rgba(255, 255, 255, 0.4);cursor: default;'}
`
