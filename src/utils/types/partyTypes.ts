// pchips-v3/src/utils/types/partyTypes.ts

import { EResponseStatus, EResponseMessage } from "../enums/statusEnums";
import { TErrorList } from "./errorTypes";
import PartyModel from "../../../db/models/PartyModel";
import PartyUserModel from "../../../db/models/PartyUserModel";
import { IParty, IPartyUser } from "../../../db/models/utils/interfaces";
import UserModel from "../../../db/models/UserModel";

export type TPartyModelReturn = PartyModel | null;
export type TPartyReturn = IParty | null;

export type TPartyUserModelReturn = PartyUserModel | null;
export type TPartyUserReturn = IPartyUser | null;
export type TPartyUserUpdates = Partial<{ isOwner: number, isAdmin: number }>;

export type TUserPartyListConditions = { userId: number, isOwner: boolean, isAdmin: boolean };
export type TPartyUserListConditions = { partyId: number, isOwner: boolean, isAdmin: boolean };

export type TPartyModelList = PartyModel[];
export type TUserModelList = UserModel[];

export type TPartyServiceReturn = {
    status: EResponseStatus,
    partyModel: TPartyModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TPartyDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TPartyUserServiceReturn = {
    status: EResponseStatus,
    partyUserModel: TPartyUserModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TPartyUserDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TUserPartyModelListReturn = {
    status: EResponseStatus,
    partyModelList: TPartyModelList,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TPartyUserModelListReturn = {
    status: EResponseStatus,
    userModelList: TUserModelList,
    errors: TErrorList,
    message: EResponseMessage,
};