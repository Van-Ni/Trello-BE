import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { cardService } from '../services/cardService';

const createNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newcard = await cardService.createNew(req.body);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            data: newcard
        });
    } catch (error) {
        next(error);
    }
}
export const cardController = {
    createNew
}