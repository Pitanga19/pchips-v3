// pchips-v3/src/relation/utils/relationUtils.ts

import { FriendModel, EFriendStatus } from '../../../db/dbIndex';

export const checkIsSenderId = (friendModel: FriendModel, userId: number): boolean => {
    let isSenderId = false;

    if (friendModel.senderId === userId) {
        console.log(`[relationUtils] Same sender ID: ${userId}`);
        isSenderId = true;
    };

    return isSenderId;
};

export const checkIsAccepted = (friendModel: FriendModel): boolean => {
    let isAccepted = false;

    if (friendModel.status === EFriendStatus.ACCEPTED) {
        console.log(`[relationUtils] Relation is accepted`);
        isAccepted = true;
    };

    return isAccepted;
};