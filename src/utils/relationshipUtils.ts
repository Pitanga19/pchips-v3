// pchips-v3/src/utils/relationshipUtils.ts

import RelationshipModel from "../../db/models/FriendModel";
import { EFriendStatus } from "../../db/models/utils/enums";

export const checkIsSenderId = (relationshipModel: RelationshipModel, userId: number): boolean => {
    let isSenderId = false;

    if (relationshipModel.senderId === userId) {
        console.log(`[relationshipUtils] Same sender ID: ${userId}`);
        isSenderId = true;
    };

    return isSenderId;
};

export const checkIsAccepted = (relationshipModel: RelationshipModel): boolean => {
    let isAccepted = false;

    if (relationshipModel.status === EFriendStatus.ACCEPTED) {
        console.log(`[relationshipUtils] Relationship is accepted`);
        isAccepted = true;
    };

    return isAccepted;
};