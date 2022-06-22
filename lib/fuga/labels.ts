import { fetchFuga } from "./fuga";


export const createLabel = async (name: string): Promise<{ newId: number }> => {
    const createResult = await fetchFuga(`/labels`, 'POST', { name });
    if (typeof createResult?.data?.id !== 'number' || createResult?.data?.name !== name) {
        console.log(`createResult?.data`, createResult?.data);
        throw new Error("Creating new Label failed");
    }
    return { newId: createResult.data.id };
}

export const deleteLabel = async (id: number): Promise<void> => {
    await fetchFuga(`/labels/${id}`, 'DELETE');
}

export const replaceLabel = async (oldId: number, newName: string): Promise<{ newId: number }> => {
    await deleteLabel(oldId);
    return await createLabel(newName);
}

