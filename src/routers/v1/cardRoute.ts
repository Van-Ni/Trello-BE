
import { cardController } from '../../controllers/cardController';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cardValidation } from '../../validations/cardValidation';

const Router = express.Router();
Router.route('/')
    .get((req: Request, res: Response) => {
        res.status(StatusCodes.OK).send('GET /v1/cards');
    })
    .post(cardValidation.createNew, cardController.createNew);

export const cardRoute = Router;