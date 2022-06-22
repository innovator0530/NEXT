import { GetServerSideProps } from "next"
import { ThemeProvider } from "styled-components"
import AppHeader from "../../components/frontend/Header/AppHeader"
import { withAuthSession } from "../../middleware/nextAuthSession"
import { Background, BigTitle, Container, CurrentPlanContainer, CurrentPlanName, CurrentPlanTitle, darkTheme, PlanOptionCard, PlanOptionFeature, PlanOptionName, PlanOptionPrice, PlanOptionsContainer } from "../../styles/frontend"


function planupgrade(props) {


    return (
        <ThemeProvider theme={darkTheme}>
            <Background >
                <AppHeader theme={darkTheme} label="free" appConfig={props.appConfig} />
                <Container>
                    <BigTitle >Plan Upgrade</BigTitle>
                    <CurrentPlanContainer>
                        <CurrentPlanTitle>Current Plan</CurrentPlanTitle>
                        <CurrentPlanName>Classic</CurrentPlanName>
                    </CurrentPlanContainer>

                    <PlanOptionsContainer>
                        <PlanOptionCard active>
                            <div className="active-sign">ACTIVE</div>
                            <PlanOptionName mb="22px" mt="24px">Classic</PlanOptionName>
                            <PlanOptionFeature mb="10px">90% Royalties</PlanOptionFeature>
                            <PlanOptionFeature mb="10px">Unlimited Artists</PlanOptionFeature>
                            <PlanOptionFeature mb="10px">Normal Support</PlanOptionFeature>
                            <PlanOptionFeature mb="34px">Unlimited Uploads</PlanOptionFeature>
                            <PlanOptionPrice>Free</PlanOptionPrice>
                        </PlanOptionCard>
                        <PlanOptionCard>
                            <div className="active-sign">ACTIVE</div>
                            <PlanOptionName >Silver</PlanOptionName>
                            <PlanOptionFeature >Coming soon</PlanOptionFeature>
                            <PlanOptionPrice>Soon</PlanOptionPrice>
                        </PlanOptionCard>
                        <PlanOptionCard>
                            <div className="active-sign">ACTIVE</div>
                            <PlanOptionName >Gold</PlanOptionName>
                            <PlanOptionFeature >Coming soon</PlanOptionFeature>
                            <PlanOptionPrice>Soon</PlanOptionPrice>
                        </PlanOptionCard>
                        <PlanOptionCard>
                            <div className="active-sign">ACTIVE</div>
                            <PlanOptionName >Label</PlanOptionName>
                            <PlanOptionFeature >Coming soon</PlanOptionFeature>
                            <PlanOptionPrice>Soon</PlanOptionPrice>
                        </PlanOptionCard>
                    </PlanOptionsContainer>
                </Container>
            </Background>
        </ThemeProvider>
    )
}


// export const getServerSideProps = withSession(async function ({ req, res }) {
// 	const user = req.session.get('user');
// 	const checkUserResult = checkUser(req.session)

// 	if (checkUserResult.redirect) {
// 		return {
// 			redirect: {
// 				destination: checkUserResult.redirect,
// 				permanent: false,
// 			},
// 		}
// 	}



// 	// Fetching App Config

// 	const cfr = await fetch(`${server}/api/config`);
// 	const config:GlobalAppConfig = await cfr.json();


// 	if(!config.loginEnabled){
// 		req.session.destroy();
// 		return{
// 			redirect:{
// 				destination:`/login?message=${encodeURIComponent('Login has been temporarily disabled for all users')}`
// 			}
// 		}
// 	}

// 	return {
// 		props: { appConfig:config },
// 	}
// })


export const getServerSideProps: GetServerSideProps = withAuthSession(async (context) => {
    
    return {
        props: {}
    }
})


export default planupgrade
