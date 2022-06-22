import { ListContainer, ListItemContainer } from "./TrackUploadsList_styles"
import { useContext, useState } from "react"
import TrackListItem from "./TrackListItem"
import { Soundtrack } from "../../../models/releases.models"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { CreateReleaseContext } from "../../../context/CreateReleaseState/CreateReleaseState"

const loadingTrack = () => {
	return <ListItemContainer></ListItemContainer>
}

function TrackUploadsList(props) {
	// console.log(props.tracks)

	const { tracks, tracksUploading, trackSwitchPosition,deleteTrack, goToEditTrack} =
		useContext(CreateReleaseContext)

	// const tracks: Object = props.tracks
	// const setTracks: Function = props.setTracks
	// const trackFiles: Object = props.trackFiles
	// const loadingTracks = props.loadingTracks
	const [playingIndex, setPlayingIndex] = useState<number>(-1)
	// const setErrorMessage = props.setErrorMessage || (()=>{});
	// console.log("loading tracks:", loadingTracks)
	// const onDragEnd = (result) => {
	// 	const { source, destination, draggableId } = result
	// 	if (!destination) {
	// 		return
	// 	}

	// 	if (
	// 		destination.droppableId === source.droppableId &&
	// 		destination.index === source.index
	// 	) {
	// 		return
	// 	}
	//     const newTrackOrder = Array.from(props.trackOrder);
	//     newTrackOrder.splice(source.index,1);
	//     newTrackOrder.splice(destination.index,0,draggableId);
	//     props.setTrackOrder(newTrackOrder);
	// }

	// const trackTooShort = (index:number)=>{
	// 	props.deleteTrack(index);
	// 	setErrorMessage('Track was removed because it was too short (less than 30 seconds)')
	// }

	const onDragEnd = ({ source, destination, draggableId }) => {
		console.log(
			`source,destination,draggableId`,
			source,
			destination,
			draggableId
		)
		if (source  && destination ) {
			console.log("Switching position")
			trackSwitchPosition(source.index, destination.index)
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="main">
				{(provided) => (
					<ListContainer
						ref={provided.innerRef}
						{...provided.droppableProps}
						style={props.style || {}}
					>
						{tracks.map((track, index) => {
							return (
								<TrackListItem
									internalId={track.id}
									trackFile={track.localFile || track.url}
									allowPlayback={playingIndex === index}
									key={track.id}
									index={index}
									track={track}
									startPlaying={() => setPlayingIndex(index)}
									deleteTrack={() => deleteTrack(index)}
									goToEdit={() => goToEditTrack(index)}
									trackTooShort={console.log}
								/>
							)
						})}
						{provided.placeholder}
						{Array.from(Array(tracksUploading).keys()).map((track, index) => (
							<TrackListItem
								internalId={""}
								trackFile={""}
								allowPlayback={false}
								key={index}
								index={index}
								track={track}
								startPlaying={() => {}}
								deleteTrack={() => {}}
								goToEdit={() => {}}
								blurred={true}
							/>
						))}
					</ListContainer>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default TrackUploadsList
