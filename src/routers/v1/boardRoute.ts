// File: boardRoute.ts

import { boardController } from '../../controllers/boardController';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardValidation } from '../../validations/boardValidation';

const Router = express.Router();

// #express: Express.js router.route() Function
Router.route('/')
  .get((req: Request, res: Response) => {
    res.status(StatusCodes.OK).send('GET /v1/boards');
  })
  .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)
  .delete((req: Request, res: Response) => {
    const id = req.params.id;
    res.status(StatusCodes.OK).send(`DELETE /v1/boards/${id}`);
  });

Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToAnotherColumn, boardController.moveCardToAnotherColumn)


export const boardRoute = Router;