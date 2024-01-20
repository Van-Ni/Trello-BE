import { columnModel } from "../models/columnModel";
import { cardModel } from "../models/cardModel"

const createNew = async (cardData: any) => {
    try {
        const newcard: any = {
            ...cardData,
        };
        const createdcard = await cardModel.createNew(newcard);
        const foundcard = await cardModel.findCardById(createdcard.insertedId);
        if (foundcard) {
            // update cardOrderIds in column collections
            await columnModel.pushCardOrderIds(foundcard.columnId, createdcard.insertedId);
        }
        return foundcard;
    } catch (error) {
        throw error;
    }
}

export const cardService = {
    createNew
}