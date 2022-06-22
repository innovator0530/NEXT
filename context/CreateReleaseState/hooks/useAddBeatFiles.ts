import { Dispatch } from "react"
import { server } from "../../../config"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_FILE_EXTENSIONS = ['pdf']

export const useAddBeatFile = (
	state: CreateReleaseState,
	dispatch: Dispatch<CreateReleaseAction>
) => {
	const save = async (file:File) => {
		dispatch({type:'ADD_BEAT_FILE_START_UPLOAD'});
		if(file.size > MAX_FILE_SIZE){
			dispatch({type:'ADD_BEAT_FILE_UPLOAD_FAILED',errorMessage:'File cannot exceed 100MB'})
			return
		}
		if(!ALLOWED_FILE_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase())){
			dispatch({type:'ADD_BEAT_FILE_UPLOAD_FAILED',errorMessage:'Only .pdf files are allowed!'})
			return;
		}
		const body = new FormData();
		body.append('beat-file',file);
		const result = await fetch(`${server}/api/releases/beat-files`, {
			method: "POST",
			body,
		})
		if (Math.floor(result.status / 100) === 2) {
			const json = await result.json();
			console.log(`json from Upload Beat file`, json)
			if(json.urls&& json.urls[0]){
				dispatch({type:'ADD_BEAT_FILE_UPLOAD_FINISHED',url:json.urls[0],name:file.name})
			}
			else{
				dispatch({type:'ADD_BEAT_FILE_UPLOAD_FAILED'})
			}
		} else {
			dispatch({type:'ADD_BEAT_FILE_UPLOAD_FAILED'})
		}
	}
	return save
}
