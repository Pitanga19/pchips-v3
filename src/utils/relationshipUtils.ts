// pchips-v3/src/utils/relationshipUtils.ts

import RelationshipModel from "../../db/models/FriendModel";
import { EFriendStatus } from "../../db/models/utils/enums";

export const checkIsSenderId = (relationshipModel: RelationshipModel, userId: number): boolean => {
    let isSenderId = false;

    if (relationshipModel.senderId === userId) {
        console.log(`[RelationshipService] Same sender ID: ${userId}`);
        isSenderId = false;
    };

    return isSenderId;
};

export const checkIsAccepted = (relationshipModel: RelationshipModel): boolean => {
    let isAccepted = false;

    if (relationshipModel.status === EFriendStatus.ACCEPTED) {
        console.log(`[RelationshipService] Relationship is accepted`);
        isAccepted = true;
    };

    return isAccepted;
};