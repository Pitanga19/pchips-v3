// pchips-v3/src/party/utils/partyTypes.ts

import { PartyModel, PartyUserModel, IParty, IPartyUser } from '../../../db/dbIndex';
import { TDeleteReturn } from '../../common/commonIndex';
import { TUserService, TUserList, TUserModel, TUserData } from '../../auth/authIndex';

export type TPartyModel = PartyModel | null;
export type TPartyData = IParty | null;

export type TPartyModelList = PartyModel[];
export type TPartyDataList = IParty[];

export type TPartyList = {
    partyModelList: TPartyModelList,
    partyDataList: TPartyDataList,
};
export type TPartyUpdates = Partial<{ name: string }>;

export type TPartyUserModel = PartyUserModel | null;
export type TPartyUserData = IPartyUser | null;

export type TPartyUserUpdates = Partial<{
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TUserPartyListConditions = Partial<{
    userId: number,
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TPartyUserListConditions = Partial<{
    partyId: number,
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TUserPartyPermissions = {
    isOwner: boolean,
    isAdmin: boolean,
};

export type TPartyService = {
    partyModel: TPartyModel,
    partyData: TPartyData
};

export type TPartyDelete = TDeleteReturn;

export type TPartyUserService = {
    partyUserModel: TPartyUserModel,
    partyUserData: TPartyUserData
};

export type TPartyUserDelete = TDeleteReturn;

export type TUserParties = TUserService & TPartyList;

export type TPartyMembers = TPartyService & TUserList;

export type TPartyManagementFindData = {
    actorId?: number,
    targetId?: number,
    partyId?: number,
};

export type TPartyManagement = {
    actorModel: TUserModel,
    actorData: TUserData,
    partyModel: TPartyModel,
    partyData: TPartyData,
    partyActorModel: TPartyUserModel,
    partyActorData: TPartyUserData,
};

export type TPartyManageTarget = {
    actorModel: TUserModel,
    actorData: TUserData,
    targetModel: TUserModel,
    targetData: TUserData,
    partyModel: TPartyModel,
    partyData: TPartyData,
    partyActorModel: TPartyUserModel,
    partyActorData: TPartyUserData,
    partyTargetModel: TPartyUserModel,
    partyTargetData: TPartyUserData,
};

export type TPartyManageDelete = {
    actorModel: TUserModel,
    actorData: TUserData,
    targetModel: TUserModel,
    targetData: TUserData,
    partyModel: TPartyModel,
    partyData: TPartyData,
    partyActorModel: TPartyUserModel,
    partyActorData: TPartyUserData,
    deleted: boolean,
};

export type TPartyManageLeave = {
    actorModel: TUserModel,
    actorData: TUserData,
    partyModel: TPartyModel,
    partyData: TPartyData,
    deleted: boolean,
};

export type TPartyUserManagement = TPartyUserService;

export type TPartyListManagement = TUserParties | TPartyMembers;

export type TPartyManagementDelete = TDeleteReturn;

export type TPartyCreateBody = {
    actorId: number
    partyName: string,
};

export type TPartyManageBody = {
    actorId: number,
    partyId: number,
    targetId: number,
};

export type TPartySelfBody = {
    actorId: number,
    partyId: number,
};

export type TPartyUpdateBody = {
    actorId: number,
    partyId: number,
    updates: TPartyUpdates,
};

export type TUserPartiesBody = {
    userId: number,
};

export type TPartyMembersBody = {
    partyId: number,
};

export type TPartyManagementBody = Partial<TPartyCreateBody & TPartyManageBody & TPartyUpdateBody>;