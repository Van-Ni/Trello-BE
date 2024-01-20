import { boardModel } from "../models/boardModel";
import { columnModel } from "../models/columnModel"

const createNew = async (columnData: any) => {
    try {
        const newcolumn: any = {
            ...columnData,
        };
        const createdcolumn = await columnModel.createNew(newcolumn);
        const foundcolumn = await columnModel.findColumnById(createdcolumn.insertedId);
        if (foundcolumn) {
            // handle cards data 
            foundcolumn.cards = [];
            // update columnOrderIds in board collections
            await boardModel.pushColumnOrderIds(foundcolumn.boardId, createdcolumn.insertedId);
        }
        return foundcolumn;
    } catch (error) {
        throw error;
    }
}

export const columnService = {
    createNew
}