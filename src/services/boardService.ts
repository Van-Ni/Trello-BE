import { slugify } from "../utils/formatters";

import { boardModel } from "../models/boardModel"
import { ObjectId } from "mongodb";
import _ from "lodash";
import { BoardResponse, Card, Column } from "../utils/interfaces/boardInterface";
import ApiError from "utils/ApiError";
import { StatusCodes } from "http-status-codes";

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
export const boardService = {
  createNew,
  getDetails
}