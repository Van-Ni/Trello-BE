import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { columnService } from '../services/columnService';
import { ObjectId } from 'mongodb';

const createNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newColumn = await columnService.createNew(req.body);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            data: newColumn
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedColumn = await columnService.update(new ObjectId(id), req.body);

        if (!updatedColumn) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Column not found',
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: updatedColumn
        });
    } catch (error) {
        next(error);
    }
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedColumn = await columnService.deleteItem(new ObjectId(id));

        if (!deletedColumn) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Column not found',
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data: deletedColumn
        });
    } catch (error) {
        next(error);
    }
}
export const columnController = {
    createNew,
    update,
    deleteItem
}