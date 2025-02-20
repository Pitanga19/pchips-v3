// pchips-v3/src/utils/relationUtils.ts

import RelationModel from "../../db/models/FriendModel";
import { EFriendStatus } from "../../db/models/utils/enums";

export const checkIsSenderId = (relationModel: RelationModel, userId: number): boolean => {
    let isSenderId = false;

    if (relationModel.senderId === userId) {
        console.log(`[relationUtils] Same sender ID: ${userId}`);
        isSenderId = true;
    };

    return isSenderId;
};

export const checkIsAccepted = (relationModel: RelationModel): boolean => {
    let isAccepted = false;

    if (relationModel.status === EFriendStatus.ACCEPTED) {
        console.log(`[relationUtils] Relation is accepted`);
        isAccepted = true;
    };

    return isAccepted;
};