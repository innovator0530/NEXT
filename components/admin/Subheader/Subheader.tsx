import Link from "next/link";
import {Container, ContentContainer, NavItem} from "./Subheader_styles";

function Subheader({links}) {
    return (
        <Container>
            <ContentContainer>
                {links.map(({href,name, active},index)=>(
                    <NavItem key={href} active={active}><Link href={href}>{name}</Link></NavItem>
                ))}
                
            </ContentContainer>
        </Container>
    )
}

export default Subheader
