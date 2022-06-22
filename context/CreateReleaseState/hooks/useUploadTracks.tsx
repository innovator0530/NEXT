import React, { Dispatch, useCallback, useEffect, useRef } from "react"
import { server } from "../../../config"
import { CreateReleaseDispatch } from "../CreateReleaseState"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
const MAX_CONCURRENT_TRACK_UPLOADS = 1

function useUploadTracks(
	state: CreateReleaseState,
	dispatch: CreateReleaseDispatch
) {
	const uploadQueue = useRef<File[]>([])
	const tracksCurrentlyUploading = useRef<number>(0)
	const uploadFile = useCallback((file: File) => {
		dispatch({ type: "TRACK_FILE_UPLOAD_STARTED" })
		const p = Promise.all([
			new Promise(
				(
					resolve: (a: {
						successful: boolean
						localFile?: string | ArrayBuffer
					}) => void
				) => {
					// console.log(`resolve`, resolve)
					if (FileReader) {
						const fr = new FileReader()
						fr.onload = () => {
							// console.log("LOADED")
							resolve({ successful: true, localFile: fr.result })
						}
						fr.onerror = () => {
							resolve({ successful: false })
						}
						fr.onabort = () => {
							resolve({ successful: false })
						}
						fr.readAsDataURL(file)
					} else {
						resolve({ successful: false })
					}
				}
			),
			(async (): Promise<{
				valid: boolean
				urls?: string[]
				message?: string,
				durations?: number[]
			}> => {
				const body = new FormData()
				body.append("audiofile", file)
				const result = await fetch(`${server}/api/releases/asset`, {
					method: "POST",
					body,
				})
				// console.log('Finsished')
				if (Math.floor(result.status / 100) === 2) {
					const json = await result.json()
					// console.log(`json`, json)
					if (json.filesValid) {
						return { valid: json.filesValid, urls: json.urls, durations: json.durations }
					} else {
						return { valid: json.filesValid, message: json.validationMessage }
					}
				} else {
					return { valid: false, message: "Upload failed" }
				}
			})(),
		])
			.then(
				([fileReaderResult, uploadResult]: [
					{ successful: boolean; localFile?: string | ArrayBuffer },
					{ valid: boolean; urls?: string[]; message?: string, durations?:number[] }
				]) => {
					if (uploadResult.valid) {
						dispatch({
							type: "TRACK_FILE_UPLOAD_SUCCESSFUL",
							filename: file.name,
							duration: uploadResult.durations ? uploadResult.durations[0]: -1,
							localFile: fileReaderResult.localFile,
							url: uploadResult.urls && uploadResult.urls[0],
						})
					} else {
						dispatch({
							type: "TRACK_FILE_UPLOAD_FAILED",
							message: uploadResult.message,
						})
					}
					tracksCurrentlyUploading.current--
					const nextFile = uploadQueue.current.shift()
					if (nextFile) {
						console.log("Uploading from queue!")
						uploadFile(nextFile)
					}
				}
			)
			.catch((e) => {
				tracksCurrentlyUploading.current--
				const nextFile = uploadQueue.current.shift()
				if (nextFile) {
					console.log("Uploading from queue!")
					uploadFile(nextFile)
				}
			})
	}, [])
	const handleSelectedFile = useCallback((file: File) => {
		if (
			file.type !== "audio/wav" &&
			file.type != "audio/flac" &&
			file.type != "audio/x-wav"
		) {
			dispatch({
				type: "TRACK_FILE_REJECTED",
				message: "The file type you uploaded is not accepted",
			})
		} else if (
			tracksCurrentlyUploading.current >= MAX_CONCURRENT_TRACK_UPLOADS
		) {
			console.log("Put file with name", file.name, "to queue")
			uploadQueue.current.push(file)
		} else {
			tracksCurrentlyUploading.current++
			uploadFile(file)
		}
	}, [])
	const selectFiles = useCallback((files: File[]) => {
		dispatch({ type: "TRACK_FILES_SELECTED", count: files.length })
		for (let i = 0; i < files.length; i++) {
			handleSelectedFile(files[i])
		}
	}, [])
	// useEffect(() => {
	// 	if (
	// 		state.trackUploadQueue[0] &&
	// 		state.tracksCurrentlyUploading < MAX_CONCURRENT_TRACK_UPLOADS
	// 	) {
	// 		console.log("USE EFFECT FIRED!!!")
	// 		const file = state.trackUploadQueue[0].file
	// 		const fileId = state.trackUploadQueue[0].id
	// 		console.log(`file`, file)
	// 		if (
	// 			file.type !== "audio/wav" &&
	// 			file.type != "audio/flac" &&
	// 			file.type != "audio/x-wav"
	// 		) {
	// 			dispatch({
	// 				type: "TRACK_FILE_UPLOAD_FAILED",
	// 				fileId,
	// 				message: "The file type you uploaded is not accepted",
	// 			})
	// 			return
	// 		}
	// 		dispatch({ type: "TRACK_FILE_UPLOAD_STARTED", fileId })
	// 		const p = Promise.all([
	// 			new Promise(
	// 				(
	// 					resolve: (a: {
	// 						successful: boolean
	// 						localFile?: string | ArrayBuffer
	// 					}) => void
	// 				) => {
	// 					// console.log(`resolve`, resolve)
	// 					if (FileReader) {
	// 						const fr = new FileReader()
	// 						fr.onload = () => {
	// 							// console.log("LOADED")
	// 							resolve({ successful: true, localFile: fr.result })
	// 						}
	// 						fr.onerror = () => {
	// 							resolve({ successful: false })
	// 						}
	// 						fr.onabort = () => {
	// 							resolve({ successful: false })
	// 						}
	// 						fr.readAsDataURL(file)
	// 					} else {
	// 						resolve({ successful: false })
	// 					}
	// 				}
	// 			),
	// 			(async (): Promise<{
	// 				valid: boolean
	// 				urls?: string[]
	// 				message?: string
	// 			}> => {
	// 				const body = new FormData()
	// 				body.append("audiofile", file)
	// 				const result = await fetch(`${server}/api/releases/asset`, {
	// 					method: "POST",
	// 					body,
	// 				})
	// 				// console.log('Finsished')
	// 				if (Math.floor(result.status / 100) === 2) {
	// 					const json = await result.json()
	// 					// console.log(`json`, json)
	// 					if (json.filesValid) {
	// 						return { valid: json.filesValid, urls: json.urls }
	// 					} else {
	// 						return { valid: json.filesValid, message: json.validationMessage }
	// 					}
	// 				} else {
	// 					return { valid: false, message: "Upload failed" }
	// 				}
	// 			})(),
	// 		]).then(
	// 			([fileReaderResult, uploadResult]: [
	// 				{ successful: boolean; localFile?: string | ArrayBuffer },
	// 				{ valid: boolean; urls?: string[]; message?: string }
	// 			]) => {
	// 				if (uploadResult.valid) {
	// 					dispatch({
	// 						type: "TRACK_FILE_UPLOAD_SUCCESSFUL",
	// 						filename: file.name,
	// 						fileId,
	// 						localFile: fileReaderResult.localFile,
	// 						url: uploadResult.urls && uploadResult.urls[0],
	// 					})
	// 				} else {
	// 					dispatch({
	// 						type: "TRACK_FILE_UPLOAD_FAILED",
	// 						fileId,
	// 						message: uploadResult.message,
	// 					})
	// 				}
	// 			}
	// 		)
	// }
	// }, [state.trackUploadQueue])
	return { selectFiles }
}

export default useUploadTracks
