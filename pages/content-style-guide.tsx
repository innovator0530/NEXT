import {
    Background,
    Bubble1,
    Bubble2,
    Bubble3,
    Container
}
from "../styles/login"
import Footer from "../components/login/footer/footer"
import{ContentStyleGuideContainer} from "../styles/frontend"
function contentStyleGuide() {
  
    return (
        <Background>
            <Container>
            <Bubble1/>
            <Bubble2/>
            <Bubble3/>
            <ContentStyleGuideContainer>
            <h2>Content Style Guide</h2>
            <p>Lorem Ipsum</p>
            </ContentStyleGuideContainer>
            
            <Footer
                style={{
                    position:"absolute",
                    bottom: 24
                }}
            />
            </Container>
        </Background>
    )
}

export default contentStyleGuide
