// pchips-v3/src/utils/types/relationshipTypes.ts

import { EResponseStatus, EResponseMessage } from "../enums/statusEnums";
import UserModel from "../../../db/models/UserModel";
import FriendModel from "../../../db/models/FriendModel";
// import BlockModel from "../../../db/models/BlockModel";
import { TErrorList } from "./errorTypes";

export type TFriendModelReturn = FriendModel | null;

export type TFriendServiceReturn = {
    status: EResponseStatus,
    friendModel: FriendModel | null,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationshipUserListReturn = {
    status: EResponseStatus,
    friendModelList: UserModel[],
    errors: TErrorList,
    message: EResponseMessage,
};

export type TRelationshipDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};