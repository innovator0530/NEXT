import {useState} from 'react';
import {TagsContainer, TagButton} from "./TagFilter_styles"

export interface Tag{
    code:string;
    name:string;
    amount:number;
}


function TagFilter(props) {
    //const [selectedTag, setSelectedTag] = useState<Tag>(props.selectedTag);

    return (
        <TagsContainer>
            {
                props.fields.map((field,index)=>(
                    <TagButton key={index} active={index===props.selectedTag} onClick={()=>props.onSelectTag(index)}>
                        {field.name} ({field.amount})
                    </TagButton>
                ))
            }
        </TagsContainer>
    )
}

export default TagFilter
