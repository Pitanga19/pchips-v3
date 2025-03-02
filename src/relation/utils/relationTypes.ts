// pchips-v3/src/relation/utils/relationTypes.ts

import { FriendModel, BlockModel, IFriend, IBlock, EFriendStatus } from '../../../db/dbIndex';
import { TDeleteReturn } from '../../common/commonIndex';
import { TUserData, TUserDataList, TUserModel, TUserModelList } from '../../auth/authIndex';

export type TFriendModel = FriendModel | null;
export type TFriendData = IFriend | null;

export type TFriendUpdates = { status: EFriendStatus };
export type TFriendFindData = {
    firstUserId: number,
    secondUserId: number,
};

export type TFriendFindResult = TFriendService;

export type TFriendService = {
    friendModel: TFriendModel,
    friendData: TFriendData,
};

export type TFriendList = {
    userModel: TUserModel,
    userData: TUserData,
    friendModelList: TUserModelList,
    friendDataList: TUserDataList,
};

export type TBlockModel = BlockModel | null;
export type TBlockData = IBlock | null;

export type TBlockFindData = Partial<IBlock>;
export type TBlockFindResult = TBlockService;

export type TBlockService = {
    blockModel: TBlockModel,
    blockData: TBlockData,
};

export type TBlockList = {
    userModel: TUserModel,
    userData: TUserData,
    blockedModelList: TUserModelList,
    blockedDataList: TUserDataList,
};

export type TRelationFriend = TFriendService;

export type TRelationFriendList = TFriendList;

export type TRelationBlock = TBlockService;

export type TRelationBlockList = TBlockList;

export type TRelationDelete = TDeleteReturn;

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