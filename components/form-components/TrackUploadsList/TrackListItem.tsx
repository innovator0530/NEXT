import Image from "next/image"
import { createRef, useEffect, useState } from "react"
import {
	BlurredContainer,
	Button,
	ButtonsContainer,
	HandleContainer,
	ListItemContainer,
	Space,
	TimelineContainer,
	TimelineWrapper,
	TrackIndex,
	TrackName,
	TrashIconContainer,
	LoadingSpinner,
} from "./TrackUploadsList_styles"
import {
	PlayButtonContainer,
	Timeline,
	TrackTime,
} from "../../frontend/ReleaseOverview/TrackList/TrackList_styles"
import { Draggable, resetServerContext } from "react-beautiful-dnd"
import { TrackState } from "../../../context/CreateReleaseState/models/TrackState.model"
resetServerContext();

const minDuration = 30;

const TrackListItem = ({
	internalId,
	track,
	trackFile,
	index,
	startPlaying,
	allowPlayback,
	deleteTrack,
	goToEdit,
	blurred = false,
	trackTooShort = ()=>{}
}:{track:TrackState}&any) => {
	const [duration, setDuration] = useState(0)
	const [progress, setProgress] = useState<number>(0)
	const [displayTime, setDisplayTime] = useState<number>(duration)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const audioRef = createRef<any>()
	const setTime = (progress: number) => {
		audioRef.current.currentTime = progress
		setProgress(progress)
		setDisplayTime(progress)
	}

	const togglePlaying = (e?) => {
		if (e) {
			e.preventDefault()
		}
		isPlaying ? audioRef.current.pause() : audioRef.current.play()
		setIsPlaying(!isPlaying)
		setDisplayTime(
			Math.floor(isPlaying ? audioRef.current.currentTime : duration)
		)
		if (!isPlaying) startPlaying()
	}
	const audioTimeUpdate = (e) => {
		setProgress(e.target.currentTime)
		setDisplayTime(
			Math.floor(isPlaying ? audioRef.current.currentTime : duration)
		)
	}
	const audioEnded = (e) => {
		setProgress(0)
		setDisplayTime(duration)
		setIsPlaying(false)
	}

	const durationChange = (e) => {
		console.log("duration change", e.target.duration)
		if(e.target.duration < minDuration ){
			trackTooShort();
		}
		setDuration(Math.floor(e.target.duration))
		if (!isPlaying) {
			setDisplayTime(Math.floor(e.target.duration))
		}
	}

	useEffect(() => {
		if (!allowPlayback && isPlaying) {
			togglePlaying()
		}
	})

	const clickEdit = (e) => {
		e.preventDefault()
		goToEdit()
	}

	const clickDelete = (e) => {
		e.preventDefault()
		deleteTrack()
	}

	return (
		<Draggable draggableId={String(internalId)} index={index}>
			{(provided) => (
				<ListItemContainer blurred={blurred}
					{...provided.draggableProps}
					ref={provided.innerRef}
					
				>
					<HandleContainer className="blurrable" {...provided.dragHandleProps}>
						<Image src="/icons/dragndrop.svg" layout="fill" />
					</HandleContainer>
					<TrackIndex className="blurrable">Track {index + 1}</TrackIndex>
					<TrackName className="blurrable">{track.title}</TrackName>
					<TimelineContainer className="blurrable">
						<PlayButtonContainer
							style={{ marginRight: "8px" }}
							onClick={togglePlaying}
						>
							<Image
								src={isPlaying ? "/icons/pause.svg" : "/icons/playbutton.svg"}
								layout="fill"
							/>
						</PlayButtonContainer>
						<TimelineWrapper>
							<audio
								style={{ display: "none" }}
								ref={audioRef}
								src={trackFile}
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
								onMouseUp={() => (isPlaying ? 0 : setDisplayTime(duration))}
							></Timeline>
						</TimelineWrapper>
						<TrackTime>
							{Math.floor(displayTime / 60)}:
							{displayTime % 60 < 10
								? "0" + (displayTime % 60)
								: displayTime % 60}
						</TrackTime>
					</TimelineContainer>
					<Space />
					<ButtonsContainer className="blurrable">
						<Button onClick={clickEdit}>Edit</Button>
						<Button
							style={{ padding: "8px 9px", marginLeft: "8px" }}
							onClick={clickDelete}
						>
							<TrashIconContainer className="icon">
								<Image src="/icons/trash.svg" layout="fill" />
							</TrashIconContainer>
						</Button>
					</ButtonsContainer>
					{blurred && (
						<BlurredContainer>
							<LoadingSpinner>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</LoadingSpinner>
						</BlurredContainer>
					)}
				</ListItemContainer>
			)}
		</Draggable>
	)
}
export default TrackListItem
