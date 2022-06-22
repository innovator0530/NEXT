import {
    IconContainer,
    LabelContainer,
    Label,
    Popover
}from "./CreateReleaseForms_styles";
import Image from "next/image";
import {createRef, useState} from "react";

function InfoLabel({htmlFor,labelText,children, style={}, noPopover=false,fontColor=null}) {
    const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [popoverOpaque, setPopoverOpaque] = useState<boolean>(false)
    const popoverRef = createRef()
    const showPopover = ()=>{
        setPopoverVisible(true);
        setPopoverOpaque(true);
    }
    const hidePopover = ()=>{
        setPopoverOpaque(false);
        setTimeout(()=>setPopoverVisible(false),500)
    }
    return (
        <LabelContainer style={style} onFocus={showPopover}  onBlur={hidePopover}>
            <Label fontColor={fontColor} htmlFor={htmlFor}>
                {labelText}
            </Label>
            {!noPopover&&<IconContainer onClick={(e)=>e.preventDefault()}>
                <Image src="/icons/info.svg" layout="fill"/>
            </IconContainer>}
            {popoverVisible&&children&&<Popover style={{opacity:popoverOpaque?1:0}} ref={popoverRef}>{children}</Popover>}
        </LabelContainer>
    )
}


export default InfoLabel
