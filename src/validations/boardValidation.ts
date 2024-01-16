// #express : Node-Express Boilerplates For Building RESTful API's
// https://dev.to/rhuzaifa/top-5-node-express-boilerplates-for-building-restful-api-s-1ehl

import Joi from "joi";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

const createNew = async (req: Request, res: Response, next: NextFunction) => {
    const customMessages = {
        'string.base': '{#label} phải là một chuỗi.',
        'string.empty': '{#label} không được để trống.',
        'string.min': '{#label} phải chứa ít nhất {#limit} ký tự.',
        'string.max': '{#label} không được vượt quá {#limit} ký tự.',
        'any.required': '{#label} là bắt buộc.',
    };

    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages(customMessages),
        description: Joi.string().required().min(3).max(256).trim().strict().messages(customMessages),
        type: Joi.string().valid('public', 'private').required()
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error as string).message));
    }
}
export const boardValidation = {
    createNew
}