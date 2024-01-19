import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRoute } from './boardRoute';
import { columnRoute } from './columnRoute';
import { cardRoute } from './cardRoute';

const Router = express.Router();

// Board APIs
Router.use("/boards", boardRoute)
Router.use("/columns", columnRoute)
Router.use("/cards", cardRoute)

export const API_V1 = Router;