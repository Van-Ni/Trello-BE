import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators'
import { GET_DB } from '../config/mongodb';
import { ObjectId } from 'mongodb';

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateCardData = async (cardData: any) => {
  try {
    return await CARD_COLLECTION_SCHEMA.validateAsync(cardData, { abortEarly: false });
  } catch (error) {
    throw new Error(error as string);
  }
};

const createNew = async (cardData: any) => {
  try {
    const validatedData = await validateCardData(cardData);
    const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(
      {
        ...validatedData,
        boardId: new ObjectId(validatedData.boardId),
        columnId: new ObjectId(validatedData.columnId)
      }
    );
    return createdCard;
  } catch (error) {
    throw new Error(error as string);
  }

}
const findCardById = async (cardId: ObjectId) => {
  try {
    // console.log(CardId, typeof boardId);
    const foundCard = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: cardId });
    return foundCard;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findCardById
}