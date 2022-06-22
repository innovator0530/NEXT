import {
    Container,
    LeftButton,
    RightButton
}
from "./Toggle_styles"

function Toggle({value,onChange,style={}}) {
    const handleYesClick = (e)=>{
        e.preventDefault();
        onChange({target:{value:true}})
    }

    const handleNoClick = (e)=>{
        e.preventDefault();
        onChange({target:{value:false}})
    }
    
    return (
        <Container style={style}>
            <LeftButton active={value} onClick={handleYesClick}>Yes</LeftButton>
            <RightButton active={!value} onClick={handleNoClick}>No</RightButton>
        </Container>
    )
}

export default Toggle
