// pchips-v3/src/utils/types/relationTypes.ts

import { EResponseStatus, EResponseMessage } from "../enums/statusEnums";
import { TErrorList } from "./errorTypes";
import UserModel from "../../../db/models/UserModel";
import FriendModel from "../../../db/models/FriendModel";
import BlockModel from "../../../db/models/BlockModel";

export type TFriendModelReturn = FriendModel | null;

export type TFriendServiceReturn = {
    status: EResponseStatus,
    friendModel: TFriendModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TFriendModelListReturn = {
    status: EResponseStatus,
    friendModelList: UserModel[],
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TBlockModelReturn = BlockModel | null;

export type TBlockServiceReturn = {
    status: EResponseStatus,
    blockModel: TBlockModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TBlockModelListReturn = {
    status: EResponseStatus,
    blockedModelList: UserModel[],
    errors: TErrorList,
    message: EResponseMessage,
};