import {useState} from 'react';
import {
    Form,
    ButtonContainer,
    FormGroup,
    DividedContainer,
    ErrorMessageContainer
}from "./CreateReleaseForms_styles";
import Button from "../../button/button"
import { ReleaseArtist, Soundtrack } from '../../../models/releases.models';
import InfoLabel from './InfoLabel';
import Toggle from '../../form-components/Toggle/Toggle';
import UPCInput from "../../form-components/UPCInput/UPCInput"
import DropdownInput from '../../form-components/DropdownInput/DropdownInput';
import Link from 'next/link';
import {Input2 as Input} from "../../../styles/styles"
import ArtistsSelector from '../../form-components/ArtistsSelector/ArtistsSelector';
import {Release} from "../../../models/releases.models"
import { genres } from '../../../models/options/genres';
import { Subtitle } from '../../../styles/frontend';
import { Languages } from '../../../models/options/languages';

function EditTrack(props) {
    const track:Soundtrack = props.track;
    console.log("soundtrack edittrack load:",track)
    const release: Release = props.release;
    const setTrack:Function = props.setTrack;
    const goBack:Function = props.goBack;

    // Local State:
    const [title, setTitle] = useState<string>(track.name||"");
    const [language, setLanguage] = useState<string>(track.language? (Languages.find(l=>l.code===track.language).name): (release.language?Languages.find(l=>l.code===release.language).name:""));
    const [musicLabel, setMusicLabel] = useState<string>(track.musicLabel ||  release.musicLabel||"");
    const [artists, setArtists] = useState<ReleaseArtist[]>((track.artists?.length > 0 && track.artists) || release.artists|| [{type:'primary',name:''}])
    const [primaryGenre, setPrimaryGenre] = useState<string>((track.genres&&track.genres[0])||release.genres[0]||"");
    const [secondaryGenre, setSecondaryGenre] = useState<string>((track.genres&&track.genres[1])||release.genres[1]||"");
    const [explicitLyrics, setExplicitLyrics] = useState<boolean>( typeof track.explicit === 'boolean'?track.explicit : (release.explicit||false));
    const [UPC, setUPC] = useState(track.upc || release.upc||"");
    const [publishingRights, setPublishingRights] = useState<string>(track.publishingRightsBy|| release.publishingRightsBy||"");
    const [publishingRightsYear, setPublishingRightsYear] = useState<number>(track.publishingRightsYear || release.publishingRightsYear||new Date().getFullYear());
    const [showInvalid, setShowInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const formValid = ():boolean =>{
        if(title.length <= 0){ setErrorMessage('Please type in a title for this track.'); return false;}
        if(publishingRightsYear && (publishingRightsYear <2000 || publishingRightsYear>2199)){ setErrorMessage('Please type in a valid publishing rights year'); return false;}
        if(primaryGenre === secondaryGenre ){ setErrorMessage('The primary genre cannot be the same as the secondary genre'); return false;}
        return true;
    }

        const submit = (e)=>{
            console.log("Current artists:",artists)
            e.preventDefault();
            if(formValid()){
            const trackUpdated:Soundtrack = {
                ...track,
                name:title,
            }
            if(musicLabel.length>0 && musicLabel !== release.musicLabel){trackUpdated.musicLabel = musicLabel}
            else delete trackUpdated.musicLabel;
            if(artists.length !== release.artists.length){ trackUpdated.artists = [...artists] }    
            else{
                let different = false;
                artists.forEach((a,i)=>{
                    if(a.name !== release.artists[i].name || a.type !== release.artists[i].type) different = true;
                })
                if(different){ trackUpdated.artists = [...artists]; }
                else{ delete trackUpdated.artists}
            }
            if(primaryGenre.length>=0 &&(!release.genres || primaryGenre !== release.genres[0])){
                trackUpdated.genres = [primaryGenre]}
            else{
                delete trackUpdated.genres;
            }
            if(secondaryGenre.length>=0 &&(!release.genres || secondaryGenre !== release.genres[1])){
                Array.isArray(trackUpdated.genres) ? trackUpdated.genres[1] = secondaryGenre : trackUpdated.genres = [null,secondaryGenre];
            }
            else{
                if(trackUpdated?.genres&&Array.isArray(trackUpdated.genres)&&trackUpdated.genres.length > 1) trackUpdated.genres = [trackUpdated.genres[0]];                
            }
            if(language.length>=0 && Languages.find(l=>l.name===language).code !== release.language){trackUpdated.language = Languages.find(l=>l.name===language).code}
            else{ delete trackUpdated.language}
            if(explicitLyrics !== release.explicit){trackUpdated.explicit = explicitLyrics}
            else delete trackUpdated.explicit;
            if(UPC.length>=0 && UPC !== release.upc){trackUpdated.upc = UPC}
            else delete trackUpdated.upc;
            if(publishingRights.length>=0 && publishingRights !== release.publishingRightsBy){trackUpdated.publishingRightsBy = publishingRights}
            else delete trackUpdated.publishingRightsBy;
            if(publishingRightsYear !== release.publishingRightsYear){trackUpdated.publishingRightsYear = publishingRightsYear}
            else delete trackUpdated.publishingRightsYear;
            
            if(trackUpdated?.genres&&Array.isArray(trackUpdated.genres)&&trackUpdated.genres[1]&& (typeof trackUpdated.genres[1]) === 'string' && trackUpdated.genres[0] === null){
                trackUpdated.genres[0] = primaryGenre;
            }
            console.log("track updated:",trackUpdated);
            setTrack(trackUpdated);
            goBack();
        }
        else{
            setShowInvalid(true);
        }
        
    }

    const cancel = (e)=>{
        e.preventDefault();
        goBack();
    }

    const generateUPC = () => {
		setUPC('auto')
	}


    return (
        <Form>
            <Subtitle>Tracks</Subtitle>

            {/* Track Title */}
            <FormGroup>
                <InfoLabel labelText="Track Title*" htmlFor="title" >
                    Make sure the release title matches with the cover art.
                </InfoLabel>
                <Input invalid={showInvalid&&title.length <= 0} required value={title} onChange={(e)=>setTitle(e.target.value)} style={{marginTop:'16px',marginBottom:'12px'}} name="title" type="text" placeholder="The name of your release"/>
            </FormGroup>

            {/* Music Label */}
            <FormGroup>
                <InfoLabel labelText="Label*" htmlFor="label" >
                    Indicate the name of the record label of the release.
                    If the release is not linked to any record label, select a custom label name (such as your artist name) of your choice in this field.
                    Please bear in mind, that the name should not be misleading and does not violate intellectual property laws. 
                </InfoLabel>
                <Input 
                    style={{marginTop:'16px',marginBottom:'12px'}} 
                    name="title" 
                    type="text" 
                    placeholder="Your Label"
                    value={musicLabel}
                    onChange={(e)=>setMusicLabel(e.target.value)}
                />
            </FormGroup>

            {/* Artists */}
            <ArtistsSelector minArtistCount={1} value={artists} onChange={setArtists} showInvalid={showInvalid}/>

            {/* Primary / Secondary Genre */}
            <DividedContainer>
                <FormGroup style={{flexGrow:'1', paddingRight:'12px'}}>
                    <InfoLabel labelText="Primary genre*" htmlFor="primaryGenre" noPopover><></></InfoLabel>
                    <DropdownInput 
                        style={{marginTop:'16px'}}
                        name="primaryGenre" 
                        placeholder="Your genre"
                        value={primaryGenre}
                        onChange={(e)=>setPrimaryGenre(e)}
                        options={genres}    
                    />
                </FormGroup>
                <FormGroup style={{flexGrow:'1', paddingLeft:'12px'}}>
                    <InfoLabel labelText="Secondary genre" htmlFor="secondaryGenre" noPopover><></></InfoLabel>
                    <DropdownInput
                        style={{marginTop:'16px'}}
                        name="secondaryGenre" 
                        placeholder="Your genre"
                        value={secondaryGenre}
                        onChange={(e)=>setSecondaryGenre(e)}  
                        options={genres}      
                    />
                </FormGroup>
            </DividedContainer>

            {/* Language */}
            <FormGroup>
                <InfoLabel labelText="Language" htmlFor="language" >Make sure the release title matches with the cover art.</InfoLabel>
                <DropdownInput required value={language} onChange={(e)=>setLanguage(e)} style={{marginTop:'16px',marginBottom:'12px'}} name="language" options={Languages.map(l=>l.name)} placeholder="Your Language"/>
            </FormGroup>

            {/* Explicit Lyrics */}
            <FormGroup style={{}}>
                <InfoLabel labelText="Explicit Lyrics" htmlFor="explicitLyrics" >
                    Check the Explicit box if the release data (lyrics, cover...) contains explicit material.
                    If this box is checked, do not forget to mark the individual tracks which are explicit. 
                    If the cover is the only explicit content, the tracks do not have to be marked as explicit. 
                </InfoLabel>
                <Toggle value={explicitLyrics} onChange={(e)=>setExplicitLyrics(e.target.value)} style={{marginTop:'16px',marginBottom:'12px'}} />
            </FormGroup>

            {/* Publishing Rights */}
            <InfoLabel style={{marginTop:'32px', marginBottom:'0px'}} labelText="Publishing Rights" htmlFor="publishingRights" >
                Provide the legal name of the sound recording owners. 
                This can be the record labels legal name, or your first and last name.
            </InfoLabel>
            <DividedContainer>
                <FormGroup style={{flexGrow: 1, paddingRight:'12px', marginTop:'16px'}}>
                    <Input style={{marginBottom:'0',marginTop:'0px'}} type="number" min="2000" max="3000" placeholder="Year" name="publishingRightsYear" value={publishingRightsYear} onChange={(e)=>setPublishingRightsYear(e.target.value)}/>
                </FormGroup>
                <FormGroup style={{flexGrow: 2, paddingLeft:'12px', marginTop:'16px'}}>
                    <Input style={{marginBottom:'0',marginTop:'0px'}} name="publishingRights" type="text" placeholder="Copyright owner" value={publishingRights} onChange={(e)=>setPublishingRights(e.target.value)}/>
                </FormGroup>
            </DividedContainer>

            {/* UPC */}
            <FormGroup>
                <InfoLabel labelText="ISRC Code" htmlFor="upc" >
                Similar to the UPC Code, the ISRC Code helps for identification. 
If you do not have one, we will assign one for you.
                </InfoLabel>
                <UPCInput onClick={generateUPC} required value={UPC} onChange={(e)=>setUPC(e.target.value)} style={{marginTop:'16px',marginBottom:'12px'}} name="priceCategory" placeholder="UPC"/>
            </FormGroup>

            {/* Navigation Buttons  */}
            <ButtonContainer>
                <Button  theme={{padding:'12px 22px',backgroundColor:'#0000',color:'rgba(255, 255, 255, 0.5)',fontWeight:'500'}} onClick={cancel}>Cancel</Button>
                <Button onClick={submit}>SAVE</Button>
            </ButtonContainer>
            {/* Error Message */}
			<ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
        </Form>
    )
}

export default EditTrack;