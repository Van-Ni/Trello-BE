import { ObjectId } from "mongodb";
import { boardModel } from "../models/boardModel";
import { columnModel } from "../models/columnModel"
import { cardModel } from "../models/cardModel";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

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

const update = async (columnId: ObjectId, columnData: any) => {
    try {
        const updateColumnData = {
            ...columnData,
            updatedAt: Date.now()
        }
        const updatedColumn = await columnModel.update(columnId, updateColumnData);
        return updatedColumn;
    } catch (error) {
        throw error;
    }

}

const deleteItem = async (columnId: ObjectId) => {
    try {
        // find column by columnId
        const targetColumn = await columnModel.findColumnById(columnId);

        if (!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Column not found!")
        }

        // remove column 
        await columnModel.deleteOneById(columnId);
        // remove all cards by columnId
        await cardModel.deleteManyByColumnId(columnId);
        // remove columnId in columnOrderIds[] of Board
        await boardModel.pullColumnOrderIds(targetColumn.boardId, columnId);
        
        return { deleteResult: "Column and it's Cards deleted successfully" };
    } catch (error) {
        throw error;
    }

}
export const columnService = {
    createNew,
    update,
    deleteItem
}