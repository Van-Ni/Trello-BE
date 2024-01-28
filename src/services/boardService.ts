import { slugify } from "../utils/formatters";

import { boardModel } from "../models/boardModel"
import { ObjectId } from "mongodb";
import _ from "lodash";
import { BoardResponse, Card, Column } from "../utils/interfaces/boardInterface";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { columnModel } from "../models/columnModel";
import { cardModel } from "../models/cardModel";

const createNew = async (boardData: any) => {
  try {
    const newBoard: any = {
      ...boardData,
      slug: slugify(boardData.title),
    };
    const createdBoard = await boardModel.createNew(newBoard);
    const foundBoard = await boardModel.findBoardById(createdBoard.insertedId);
    return foundBoard;
  } catch (error) {
    throw error;
  }
}
const getDetails = async (id: ObjectId) => {
  try {
    const board: BoardResponse = await boardModel.getDetails(id);

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found!")
    }

    const resBoard = _.cloneDeep(board);
    resBoard.columns = resBoard?.columns?.map((column: Column) => ({
      ...column,
      cards: (board.cards ?? []).filter((card: Card) => card.columnId.toString() === column._id.toString()),
    })) || [];

    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boardId: ObjectId, boardData: any) => {
  try {
    const updateBoardData = {
      ...boardData,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateBoardData);
    return updatedBoard;
  } catch (error) {
    throw error;
  }

}

const moveCardToAnotherColumn = async (reqData: any) => {
  try {
    const { currentCardId, prevColumnId, prevCardOrderIds, nextColumnId, nextCardOrderIds } = reqData
    // update cardOrderIds of prevColumn
    await columnModel.update(new ObjectId(prevColumnId), { cardOrderIds: prevCardOrderIds })
    // // update cardOrderIds of nextColumn
    await columnModel.update(new ObjectId(nextColumnId), { cardOrderIds: nextCardOrderIds })
    // // update columnId of currentCard
    await cardModel.update(new ObjectId(currentCardId), { columnId: nextColumnId });
    return { result: "Successfully" };
  } catch (error) {
    throw error;
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToAnotherColumn
}