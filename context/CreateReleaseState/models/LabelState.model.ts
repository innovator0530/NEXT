export interface LabelState {
	id: string
	name: string
	editable: boolean
}

export type LabelToEdit = Omit<LabelState, "id"> & {
	id?: string
	isNew: boolean
}
