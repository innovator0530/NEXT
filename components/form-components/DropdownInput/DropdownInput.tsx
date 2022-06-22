import {
    Container,
    IconButton,
    IconContainer,
    DropdownContent,
    DropdownOption,
    Input,
    DropdownContentScrollField
}from "./DropdownInput_styles";
import Image from "next/image"
import { createRef, useState } from "react";

function DropdownInput({theme={},value="", onChange=(a)=>{}, style={}, name, placeholder="", required=false,options, invalid=false}) {
    
    const [text, setText] = useState("")

    const [displayedOptions, setDisplayedOptions] = useState(options);

    const [open, setOpen] = useState<boolean>(false)

    const inputRef = createRef<HTMLInputElement>();

    const focus = ()=>{
        setOpen(true);
    }

    const blur = ()=>{
        setTimeout(()=>setOpen(false),200)
    }

    const clickDropdown = (e,type)=>{
        e.preventDefault();
        inputRef.current.blur();
        onChange(type)
        setText(type)
    }

    const inputChange = (e)=>{
        const val = e.target.value;
        setText(val);
        onChange(val);
        if(val.length>0){
            const newOptions = options.filter(l=>l.toLowerCase().substring(0,val.length)==val.toLowerCase());
            if(newOptions.length > 0){
                setDisplayedOptions([...newOptions])
            }
            else{
                setDisplayedOptions([...options])
            }
            
        }else{
            setDisplayedOptions([...options]);
        }
        
    }
    
    
    return (
        <Container >
            <Input theme={theme} ref={inputRef} invalid={invalid} style={style} onFocus={focus} onBlur={blur} className={'input '+(open?'input-open':'')} expanded required={required} value={text||value} name={name} onChange={inputChange} placeholder={placeholder}/>
            {/* <IconButton>
                <IconContainer >
                    <Image src="/icons/caret-down.svg" layout="fill"/>
                </IconContainer>
            </IconButton> */}
            <DropdownContent className={'dropdown-content '+(open?'dropdown-content-open':'')}>
                <DropdownContentScrollField>
                {displayedOptions.map((type,index,arr)=>(
                    <DropdownOption tabindex="-1" key={index} last={index>=(arr.length-1   )} onClick={(e)=>e.preventDefault()} onMouseDown={(e)=>clickDropdown(e,type)}>{type}</DropdownOption>
                ))}
                </DropdownContentScrollField>
                
            </DropdownContent>
        </Container>
    )
}

export default DropdownInput
