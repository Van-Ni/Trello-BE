import { slugify } from "../utils/formatters";

import { boardModel } from "../models/boardModel"
import { ObjectId } from "mongodb";
import _ from "lodash";
import { BoardResponse, Card, Column } from "../utils/interfaces/boardInterface";

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

    const resBoard = _.cloneDeep(board);

    resBoard.columns = resBoard?.columns?.map((column: Column) => ({
      ...column,
      cards: (board.cards ?? []).filter((card: Card) => card.columnId === column._id),
    }));

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