import Joi from "joi";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators'

const createNew = async (req: Request, res: Response, next: NextFunction) => {
    const customMessages = {
        'string.base': '{#label} phải là một chuỗi.',
        'string.empty': '{#label} không được để trống.',
        'string.min': '{#label} phải chứa ít nhất {#limit} ký tự.',
        'string.max': '{#label} không được vượt quá {#limit} ký tự.',
        'any.required': '{#label} là bắt buộc.',
    };

    const correctCondition = Joi.object({
        boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().required().min(3).max(50).trim().strict().messages(customMessages),
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error as string).message));
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const customMessages = {
        'string.base': '{#label} phải là một chuỗi.',
        'string.empty': '{#label} không được để trống.',
        'string.min': '{#label} phải chứa ít nhất {#limit} ký tự.',
        'string.max': '{#label} không được vượt quá {#limit} ký tự.',
    };

    const correctCondition = Joi.object({
        // nếu cần di chuyển sang board sang thì mới cần boardId
        // boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().min(3).max(50).trim().strict().messages(customMessages),
        cardOrderIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ).default([])
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error as string).message));
    }
}

export const columnValidation = {
    createNew,
    update
}