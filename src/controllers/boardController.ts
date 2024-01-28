import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { boardService } from '../services/boardService';
import { ObjectId } from 'mongodb';


const createNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBoard = await boardService.createNew(req.body);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            data: newBoard
        });
    } catch (error) {
        next(error);
    }
}
const getDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const board = await boardService.getDetails(new ObjectId(id));

        if (!board) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Board not found',
            });
        }

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: board,
        });
    } catch (error) {
        next(error);
    }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const board = await boardService.update(new ObjectId(id), req.body);

        if (!board) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Board not found',
            });
        }

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: board,
        });
    } catch (error) {
        next(error);
    }
};

const moveCardToAnotherColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movedCard = await boardService.moveCardToAnotherColumn(req.body);
        if (!movedCard) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Board not found',
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: movedCard,
        });
    } catch (error) {
        next(error);
    }
}
export const boardController = {
    createNew,
    getDetails,
    update,
    moveCardToAnotherColumn
}