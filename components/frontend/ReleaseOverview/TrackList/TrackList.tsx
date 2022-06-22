import Image from "next/image"
import { Soundtrack } from "../../../../models/releases.models"
import {
    PlayButtonContainer,
    TrackInfoContainer,
    TrackListContainer, TrackListItemContainer, TrackNumber, TrackTitle,
    TimelineContainer,
    Timeline,
    TrackTime,
    EditTrackButton
}
    from "./TrackList_styles"
import { createRef, useState, useEffect, FC } from "react";
import { ThemeProvider } from "styled-components"


export interface TrackListSoundtrack {
    name: string,
    fileUrl?: string,
    duration?: number,
    localFile?: string | ArrayBuffer | null,
    isrc?:string
}

const TrackListItem: FC<{
    track: TrackListSoundtrack,
    index: number,
    startPlaying: () => void,
    allowPlayback: boolean,
    theme: any,
    gotoEditTrack: (e: any) => void

}> = ({ track, index, startPlaying, allowPlayback, theme, gotoEditTrack }) => {
    const [duration, setDuration] = useState<number>(track.duration || 0);
    const [progress, setProgress] = useState<number>(0);
    const [displayTime, setDisplayTime] = useState<number>(track.duration);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = createRef<any>();
    const setTime = (progress: number) => {
        audioRef.current.currentTime = progress;
        setProgress(progress);
        setDisplayTime(progress);
    }

    const togglePlaying = (e?) => {
        if (e) { e.preventDefault() }
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
        setDisplayTime(Math.floor(isPlaying ? audioRef.current.currentTime : duration));
        if (!isPlaying) startPlaying();
    }
    const audioTimeUpdate = (e) => {
        setProgress(e.target.currentTime);
        setDisplayTime(Math.floor(isPlaying ? audioRef.current.currentTime : duration));
    }
    const audioEnded = (e) => {
        setProgress(0);
        setDisplayTime(duration);
        setIsPlaying(false)
    }

    const durationChange = (e) => {
        setDuration(Math.floor(e.target.duration));
        if (!isPlaying) {
            setDisplayTime(Math.floor(e.target.duration));
        }
    }

    useEffect(() => {
        if (!allowPlayback && isPlaying) {
            togglePlaying();
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <TrackListItemContainer>
                <PlayButtonContainer
                    onClick={togglePlaying}
                >
                    <Image src={theme.name === 'dark' ? (isPlaying ? "/icons/pause.svg" : "/icons/playbutton.svg") : (isPlaying ? "/icons/pause_black.svg" : "/icons/playbutton_black.svg")} layout="fill" />
                </PlayButtonContainer>
                <TrackInfoContainer>
                    <TrackNumber>Track {index + 1} {gotoEditTrack && <EditTrackButton onClick={gotoEditTrack}>EDIT</EditTrackButton>}</TrackNumber>
                    <TrackTitle>{track.name}</TrackTitle>
                    {track.isrc&&track.isrc!=='auto'&&<TrackTitle style={{fontSize:'11px'}}>ISRC: {track.isrc}</TrackTitle>}
                </TrackInfoContainer>
                <TimelineContainer>
                    <audio
                        ref={audioRef}
                        src={(track.localFile as string) || track.fileUrl}
                        preload="metadata"
                        onTimeUpdate={audioTimeUpdate}
                        onEnded={audioEnded}
                        onDurationChange={durationChange}
                    />
                    <Timeline
                        value={progress}
                        onInput={(e) => setTime(e.target.value)}
                        type="range"
                        min={0}
                        max={duration}
                        onMouseUp={() => isPlaying ? 0 : setDisplayTime(duration)}
                    ></Timeline>
                </TimelineContainer>
                <TrackTime>
                    {Math.floor(displayTime / 60)}:{(displayTime % 60) < 10 ? "0" + (displayTime % 60) : (displayTime % 60)}
                </TrackTime>
            </TrackListItemContainer>
        </ThemeProvider>
    )
}

const TrackList: FC<{
    gotoEditTrack?: (e: any, index: number) => void,
    tracks: TrackListSoundtrack[],
    theme:any
}> = function (props) {
    const gotoEditTrack = props.gotoEditTrack;
    const tracks = props.tracks;
    const [playingIndex, setPlayingIndex] = useState<number>(-1);
    return (
        <TrackListContainer>
            {tracks.map((track, index) => (
                <TrackListItem
                    gotoEditTrack={gotoEditTrack && ((e) => gotoEditTrack(e, index))}
                    theme={props.theme}
                    allowPlayback={playingIndex === index}
                    key={index}
                    index={index}
                    track={track}
                    startPlaying={() => setPlayingIndex(index)}
                />
            ))}
        </TrackListContainer>
    )
}

export default TrackList
