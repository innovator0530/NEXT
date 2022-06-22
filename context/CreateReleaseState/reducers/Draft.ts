import { CRSubReducer } from "./CreateReleaseReducerMain"

export const draftReducer: CRSubReducer = (state, action) => {
	switch (action.type) {
		case "SAVE_AS_DRAFT":
            if (
				state.tracksUploading > 0 
			) {
				return {
					...state,
					errorMessage: "Please wait for uploads to finish",
				}
			}
			if(state.uploadingBeatFile){
				return{
					...state,
					errorMessage:'Please wait for the file to upload'
				}
			}
			return{
				...state,
				releaseSubmissionLoading: true,
				errorMessage:'Loading...'
			}
        case "SAVE_AS_DRAFT_FAILED":
            return{
				...state,
				releaseSubmissionLoading: false,
				errorMessage: action.errorMessage
			}
        default:
            return state;
	}
}
