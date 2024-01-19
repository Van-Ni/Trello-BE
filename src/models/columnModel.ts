

import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators'
import { GET_DB } from '../config/mongodb';
import { ObjectId } from 'mongodb';

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateColumnData = async (columnData: any) => {
  try {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(columnData, { abortEarly: false });
  } catch (error) {
    throw new Error(error as string);
  }
};

const createNew = async (columnData: any) => {
  try {
    const validatedData = await validateColumnData(columnData);
    const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(validatedData);
    return createdColumn;
  } catch (error) {
    throw new Error(error as string);
  }

}
const findColumnById = async (columnId: ObjectId) => {
  try {
    // console.log(columnId, typeof boardId);
    const foundColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({ _id: columnId });
    return foundColumn;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findColumnById
}