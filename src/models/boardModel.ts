import Joi from 'joi'
import { JoiObjectId, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators'
import { GET_DB } from '../config/mongodb'
import { ObjectId } from 'mongodb'
import { BoardType } from '../utils/constants'
import { cardModel } from './cardModel'
import { columnModel } from './columnModel'
import { Board } from '../utils/interfaces/boardInterface'

// Define Collection (name & schema)
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BoardType.PUBLIC, BoardType.PRIVATE).required(),
    columnOrderIds: Joi.array().items(
        // Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        JoiObjectId().message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
const validateBoardData = async (boardData: any) => {
    try {
        return await BOARD_COLLECTION_SCHEMA.validateAsync(boardData, { abortEarly: false });
    } catch (error) {
        throw new Error(error as string);
    }
};

const createNew = async (boardData: any) => {
    try {
        const validatedData = await validateBoardData(boardData);
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validatedData);
        return createdBoard;
    } catch (error) {
        throw new Error(error as string);
    }

}

const findBoardById = async (boardId: ObjectId) => {
    try {
        // console.log(boardId, typeof boardId);
        const foundBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: boardId });
        return foundBoard;
    } catch (error) {
        throw new Error(error as string);
    }
};

const getDetails = async (boardId: ObjectId): Promise<Board> => {
    try {
        // console.log(boardId, typeof boardId);
        const foundBoard: any = await GET_DB().collection(BOARD_COLLECTION_NAME)
            .aggregate([
                // Stage 1
                {
                    $match: { _id: boardId, _destroy: false }
                },
                // Stage 2
                {
                    $lookup:
                    {
                        from: columnModel.COLUMN_COLLECTION_NAME,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns"
                    }
                },
                // Stage 3
                {
                    $lookup:
                    {
                        from: cardModel.CARD_COLLECTION_NAME,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "cards"
                    }
                },
            ]).toArray(); // #mongodb: toArray()
        return foundBoard[0] || null;
    } catch (error) {
        throw new Error(error as string);
    }
};
export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findBoardById,
    getDetails
}

