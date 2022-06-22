import {Container, Option} from "./FilterButtons_styles";

function ReleasesFilter({type, setType,options,containerStyle={}}) {
    return (
        <Container style={containerStyle}>
            {options.map((o,index)=>(
                <Option key={o.code} onClick={()=>setType(o.code)} first={index===0} last={index>=(options.length-1)} active={type===o.code}>{o.name}<div className="active-marker"/></Option>
            ))}
        </Container>
    )
}

export default ReleasesFilter
