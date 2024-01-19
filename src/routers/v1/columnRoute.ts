
import { columnController } from '../../controllers/columnController';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { columnValidation } from '../../validations/columnValidation';

const Router = express.Router();
Router.route('/')
    .get((req: Request, res: Response) => {
        res.status(StatusCodes.OK).send('GET /v1/boards');
    })
    .post(columnValidation.createNew, columnController.createNew);

export const columnRoute = Router;