import styled from "styled-components"

export const FooterContainer = styled.nav`
    width: 1140px;
    max-width:100%;
    display:flex;
    flex-wrap: wrap;
    justify-items:flex-start;
    @media (max-width: 380px){
        flex-direction:column;
    }
`

export const FooterItem = styled.div`
    font-size: 14px;
    color: #595959;
    margin: 0 12px;
    margin-top: 12px;
    cursor: pointer;
    :focus{
        text-decoration: underline;
    }
`
export const CopyrightStatement = styled.div`
    color: #595959;
    margin: 0 12px;
    margin-top: 12px;
    @media (min-width: 800px){
        margin-left: auto;
    }
    
`