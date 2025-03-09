// pchips-v3/src/room/utils/roomTypes.ts

import { RoomModel, RoomUserModel, IRoom, IRoomUser } from '../../../db/dbIndex';
import { TDeleteReturn } from '../../common/commonIndex';
import { TUserService, TUserList, TUserModel, TUserData } from '../../auth/authIndex';
import { TTableList } from '../../config/configIndex';

export type TRoomModel = RoomModel | null;
export type TRoomData = IRoom | null;

export type TRoomModelList = RoomModel[];
export type TRoomDataList = IRoom[];

export type TRoomList = {
    roomModelList: TRoomModelList,
    roomDataList: TRoomDataList,
};
export type TRoomUpdates = Partial<{ name: string }>;

export type TRoomUserModel = RoomUserModel | null;
export type TRoomUserData = IRoomUser | null;

export type TRoomUserUpdates = Partial<{
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TUserRoomListConditions = Partial<{
    userId: number,
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TRoomUserListConditions = Partial<{
    roomId: number,
    isOwner: boolean,
    isAdmin: boolean,
}>;

export type TUserRoomPermissions = {
    isOwner: boolean,
    isAdmin: boolean,
};

export type TRoomService = {
    roomModel: TRoomModel,
    roomData: TRoomData
};

export type TRoomDelete = TDeleteReturn;

export type TRoomUserService = {
    roomUserModel: TRoomUserModel,
    roomUserData: TRoomUserData
};

export type TRoomUserDelete = TDeleteReturn;

export type TUserRooms = TUserService & TRoomList;

export type TRoomMembers = TRoomService & TUserList;

export type TRoomTables = TRoomService & TTableList;

export type TRoomManagementFindData = {
    actorId?: number,
    targetId?: number,
    roomId?: number,
};

export type TRoomManagement = {
    actorModel: TUserModel,
    actorData: TUserData,
    roomModel: TRoomModel,
    roomData: TRoomData,
    roomActorModel: TRoomUserModel,
    roomActorData: TRoomUserData,
};

export type TRoomManageTarget = {
    actorModel: TUserModel,
    actorData: TUserData,
    targetModel: TUserModel,
    targetData: TUserData,
    roomModel: TRoomModel,
    roomData: TRoomData,
    roomActorModel: TRoomUserModel,
    roomActorData: TRoomUserData,
    roomTargetModel: TRoomUserModel,
    roomTargetData: TRoomUserData,
};

export type TRoomManageDelete = {
    actorModel: TUserModel,
    actorData: TUserData,
    targetModel: TUserModel,
    targetData: TUserData,
    roomModel: TRoomModel,
    roomData: TRoomData,
    roomActorModel: TRoomUserModel,
    roomActorData: TRoomUserData,
    deleted: boolean,
};

export type TRoomManageLeave = {
    actorModel: TUserModel,
    actorData: TUserData,
    roomModel: TRoomModel,
    roomData: TRoomData,
    deleted: boolean,
};

export type TRoomUserManagement = TRoomUserService;

export type TRoomListManagement = TUserRooms | TRoomMembers;

export type TRoomManagementDelete = TDeleteReturn;

export type TRoomCreateBody = {
    actorId: number
    roomName: string,
};

export type TRoomManageBody = {
    actorId: number,
    roomId: number,
    targetId: number,
};

export type TRoomSelfBody = {
    actorId: number,
    roomId: number,
};

export type TRoomUpdateBody = {
    actorId: number,
    roomId: number,
    updates: TRoomUpdates,
};

export type TUserRoomsBody = {
    userId: number,
};

export type TRoomMembersBody = {
    roomId: number,
};

export type TRoomTablesBody = {
    roomId: number,
};

export type TRoomManagementBody = Partial<TRoomCreateBody & TRoomManageBody & TRoomUpdateBody>;