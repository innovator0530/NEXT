import styled from "styled-components";


export const Input = styled.input`
width: 100%;
background: ${props=>props.theme&&props.theme.input ?props.theme.input.background:'#141414'};
border: 1px solid ${props=>props.theme && props.theme.input ? props.theme.input.borderColor :'rgba(255, 255, 255, 0.2)'};
box-sizing: border-box;
border-radius: 12px;
padding: 15px 24px;
color: ${props=>props.theme&&props.theme.fontColor?props.theme.fontColor:'#fff'};
font-size: 16px;
line-height: 16px;
:focus{
    outline:none;
    border-color: ${props=>props.theme.input?props.theme.input.borderColorFocus:'#fff'};
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