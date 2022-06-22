import styled from "styled-components";

export const TrackListContainer = styled.ul`
    list-style: none;
    margin: 8px 0;
`

export const TrackListItemContainer = styled.li`
    margin: 16px 0;
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
`

export const PlayButtonContainer = styled.button`
    background: none;
    border: none;
    position: relative;
    width: 22px;
    height: 22px;
    opacity: .5;
    cursor: pointer;
    :focus{
        outline: none;
        opacity: .7;
    }
    :hover{
        opacity: .7;
    }
`

export const TrackInfoContainer = styled.div`
    width: 140px;
    overflow:none;
    text-overflow: ellipsis;
    padding: 0 8px;
    flex-grow: 0;
    overflow-x: visible;
`

export const TrackNumber = styled.div`
    font-size: 16px;
    color: ${props=>props.theme.baseFontColor};
    opacity: 0.8;
    margin-bottom: 8px;
    display:flex;
`

export const TrackTitle = styled.div`
    font-size: 14px;
    color: ${props=>props.theme.baseFontColor};
    opacity: 0.5;
`
export const TimelineContainer = styled.div`
    flex-grow: 1;
    min-width: 50px;
    //width: 60px;
`
export const Timeline = styled.input`
    position: relative;
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 30px;
    background:  ${props=>props.theme.getRgba(.05)};
    outline: none;
    ::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: ${`linear-gradient(to right, ${props=>props.theme.getRgba(.6)} var(--buffered-width), rgba(255, 255, 255, 0.05) var(--buffered-width));`}
    }
    ::-webkit-slider-thumb {
        position: relative;
        -webkit-appearance: none;
        box-sizing: content-box;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background-color: ${props=>props.theme.baseFontColor};
        opacity: 0;
        cursor: pointer;
        margin: -3px 0 0 0;
    } 
    ::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: ${props=>((props.value*100)/props.max)}%;
        height: 100%;
        background-color: ${props=>props.theme.baseFontColor};
        opacity: 0.5;
        cursor: pointer;
        border-radius: 30px;
    }
`
export const TrackTime = styled.div`
    font-size: 14px;
    color: ${props=>props.theme.baseFontColor};
    opacity: 0.35;
    width: 50px;
    text-align: right;
`
export const EditTrackButton = styled.button`
    border: none;
    outline: none;
    font-weight: 500;
    color: #000;
    border-radius: 10px;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.04);
    font-size: 14px;
    height: 27px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left: 7px;
    margin-top: -3px;
    cursor: pointer;
    :focus{
        outline: none;
    }
    :hover{
        background: rgba(0, 0, 0, 0.08);
    }
`