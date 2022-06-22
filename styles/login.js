import Link from "next/link"
import styled from "styled-components"
import { DarkGrey } from "./styles"

export const errorColor = "#E25E43"

export const Background = styled.div`
    min-height:110vh;
    background-color: ${DarkGrey};
    display: flex;
	flex-direction: column;
	flex: 1;
    width: 100%;
    
`

export const Container = styled.div`
    min-height: 110vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow:hidden;
    padding-bottom: 10vh;
`

export const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
`


export const LoginForm = styled.form`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    color: #fff;
`

export const ImageContainer = styled.div`
    align-self: center;
    cursor: pointer;
`

export const Instructions = styled.div`
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 16px;
    align-self: center;
`

export const Label = styled.label`
    margin-top: 32px;
`



export const ForgotPassword = styled.div`
    font-size: 14px;
    color: #777;
    line-height: 17px;
    cursor: pointer;
    margin-top: 16px;
    text-decoration: underline;
`

export const HR = styled.hr`
    background-color: #fff;
    opacity: .2;
`

export const SignupInstruction = styled.div`
    font-size: 18px;
    align-self: center;
`
export const Bubble1 = styled.div`
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.025) 100%);
    width: 501px;
    height: 501px;
    left: -98px;
    top: -111px;
`
export const Bubble2 = styled.div`
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.025) 100%);
    width: 411px;
    height: 411px;
    left: 1217px;
    top: -229px;

`

export const Bubble3 = styled.div`
    position: absolute; 
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.025) 100%);
    width: 501px;
    height: 501px;
    left: 1127px;
    top: 665px;

`

export const CheckboxFormGroup = styled.div`
    display: flex;
`

export const TermsCheckbox = styled.input`

`
export const TermsLinkA = styled.a`
    text-decoration: underline;
`

export function TermsLink({ href, name, target="" }) {
  return (
    <TermsLinkA target={target} href={href}>{name}</TermsLinkA>
    // <Link href={href} passHref>
    //   <TermsLinkA>{name}</TermsLinkA>
    // </Link>
  )
}

export const LoginQuestion = styled.div`
    font-size: 18px;
    align-self: center;
    color: rgba(255, 255, 255, 0.35);
`
export const ColumnContainer = styled.div`
    display: flex;
    margin-top: 48px;
`