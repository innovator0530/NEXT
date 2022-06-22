import React from 'react'
import Footer from '../components/login/footer/footer';
import { Background, Container, darkTheme } from '../styles/frontend'
import {Bubble1, Bubble2, Bubble3} from "../styles/login";
import {ThemeProvider} from "styled-components"
import Link from 'next/link';

function _404() {
    return (
        <ThemeProvider theme={darkTheme}>
        <Background>
            <Container>
            <Bubble1/>
            <Bubble2/>
            <Bubble3/>
            <div style={{color:'white'}}>
            404<br/>
            Page was not found
            <br/>
            <Link href="/login">Return to Login</Link>
            </div>
            
            <Footer
                style={{
                    position:"absolute",
                    bottom: 24
                }}
            />
            </Container>
        </Background>
        </ThemeProvider>
    )
}

export default _404
