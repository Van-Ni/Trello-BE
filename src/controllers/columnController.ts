import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { columnService } from '../services/columnService';

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
export const columnController = {
    createNew
}