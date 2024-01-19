import { columnModel } from "../models/columnModel"

const createNew = async (columnData: any) => {
    try {
        const newcolumn: any = {
            ...columnData,
        };
        const createdcolumn = await columnModel.createNew(newcolumn);
        const foundcolumn = await columnModel.findColumnById(createdcolumn.insertedId);
        return foundcolumn;
    } catch (error) {
        throw error;
    }
}

export const columnService = {
    createNew
}