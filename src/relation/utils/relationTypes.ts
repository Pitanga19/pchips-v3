// pchips-v3/src/utils/types/relationTypes.ts

import { EResponseStatus, EResponseMessage } from '../enums/statusEnums';
import { TErrorList } from './errorTypes';
import UserModel from '../../../db/models/UserModel';
import FriendModel from '../../../db/models/FriendModel';
import BlockModel from '../../../db/models/BlockModel';
import { IUser, IFriend, IBlock } from '../../../db/models/utils/interfaces';

export type TUserModelList = UserModel[];
export type TUserList = IUser[];

export type TFriendModelReturn = FriendModel | null;
export type TFriendReturn = IFriend | null;

export type TBlockModelReturn = BlockModel | null;
export type TBlockReturn = IBlock | null;

export type TFriendServiceReturn = {
    status: EResponseStatus,
    friendModel: TFriendModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TFriendModelListReturn = {
    status: EResponseStatus,
    friendModelList: TUserModelList,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TBlockServiceReturn = {
    status: EResponseStatus,
    blockModel: TBlockModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TBlockModelListReturn = {
    status: EResponseStatus,
    blockedModelList: TUserModelList,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationFriendReturn = {
    status: EResponseStatus,
    friend: TFriendReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationFriendListReturn = {
    status: EResponseStatus,
    friendList: TUserList,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationBlockReturn = {
    status: EResponseStatus,
    block: TBlockReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationBlockListReturn = {
    status: EResponseStatus,
    blockedList: TUserList,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationFriendBody = {
    senderId: number,
    receiverId: number,
};

export type TRelationRemoveBody = {
    firstUserId: number,
    secondUserId: number,
};

export type TRelationBlockBody = {
    blockerId: number,
    blockedId: number,
};

export type TRelationListBody = {
    userId: number,
};