// pchips-v3/src/room/core/RoomManagementService.ts

import {
    RoomService, RoomUserService, validateRoomName, validateIsOwnerOrAdmin, validateIsOwner, TRoomUserUpdates, TRoomManagement, TRoomModel, TRoomData, TRoomUserModel, TRoomUserData, TRoomManageTarget, TRoomManageDelete, TRoomManagementFindData, TRoomManageLeave, TUserRooms, TRoomModelList, TRoomDataList, TRoomMembers, ERoomManagementFindType,
    TRoomUpdates,
    TRoomTables,
} from '../roomIndex';
import { TErrorList, addToResponseErrors, EErrorField, EErrorMessage } from '../../common/commonIndex';
import { TUserData, TUserDataList, TUserModel, TUserModelList, UserService } from '../../auth/authIndex';
import { TableService, TTableDataList, TTableModelList } from '../../config/configIndex';

class RoomManagementService {
    private static async find(errors: TErrorList, data: TRoomManagementFindData, findType: ERoomManagementFindType, shouldExistRoomTarget: boolean = false) {
        const { actorId, targetId, roomId } = data;

        let actorModel: TUserModel = null;
        let actorData: TUserData = null;
        let targetModel: TUserModel = null;
        let targetData: TUserData = null;
        let roomModel: TRoomModel = null;
        let roomData: TRoomData = null;
        let roomActorModel: TRoomUserModel = null;
        let roomActorData: TRoomUserData = null;
        let roomTargetModel: TRoomUserModel = null;
        let roomTargetData: TRoomUserData = null;

        if (actorId) {
            const getActorResult = await UserService.getById(errors, actorId);
            actorModel = getActorResult.userModel;
            actorData = getActorResult.userData;
        };

        if (findType === ERoomManagementFindType.FIND_PARTY || findType === ERoomManagementFindType.FIND_TARGET) {
            if (roomId) {
                const getRoomResult = await RoomService.get(errors, roomId);
                roomModel = getRoomResult.roomModel;
                roomData = getRoomResult.roomData;
            };
    
            if (actorId && roomId && actorModel && roomModel) {
                const getRoomActorResult = await RoomUserService.get(errors, roomId, actorId);
                roomActorData = getRoomActorResult.roomUserData;
                roomActorModel = getRoomActorResult.roomUserModel;
            };
        };

        if (findType === ERoomManagementFindType.FIND_TARGET) {
            if (targetId) {
                const getTargetResult = await UserService.getById(errors, targetId);
                targetModel = getTargetResult.userModel;
                targetData = getTargetResult.userData;
            };
    
            if (targetId && roomId && targetModel && roomModel && shouldExistRoomTarget) {
                const getRoomTargetResult = await RoomUserService.get(errors, roomId, targetId);
                roomTargetData = getRoomTargetResult.roomUserData;
                roomTargetModel = getRoomTargetResult.roomUserModel;
            };
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetData, roomTargetModel };
    };

    public static async create(errors: TErrorList, actorId: number, roomName: string): Promise<TRoomManagement> {
        const findData = { actorId };
        let roomModel: TRoomModel = null;
        let roomData: TRoomData = null;
        let roomActorModel: TRoomUserModel = null;
        let roomActorData: TRoomUserData = null;

        validateRoomName(errors, roomName);
        const { actorModel, actorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_ACTOR);

        if (errors.length === 0 && actorModel) {
            const createRoomResult = await RoomService.create(errors, roomName);
            roomModel = createRoomResult.roomModel;
            roomData = createRoomResult.roomData;
        };

        if (errors.length === 0 && roomModel && actorModel) {
            const createRoomUserResult = await RoomUserService.create(errors, roomModel.id, actorModel.id, true);
            roomActorModel = createRoomUserResult.roomUserModel;
            roomActorData = createRoomUserResult.roomUserData;
        };

        return { actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData };
    };

    public static async addUser(errors: TErrorList, actorId: number, roomId: number, targetId: number): Promise<TRoomManageTarget> {
        const findData = { actorId, roomId, targetId };
        let roomTargetModel: TRoomUserModel = null;
        let roomTargetData: TRoomUserData = null;

        const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, roomActorData);
        };

        if (errors.length === 0) {
            const createRoomTargetResult = await RoomUserService.create(errors, roomId, targetId);
            roomTargetModel = createRoomTargetResult.roomUserModel;
            roomTargetData = createRoomTargetResult.roomUserData;
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData };
    };

    public static async removeUser(errors: TErrorList, actorId: number, roomId: number, targetId: number): Promise<TRoomManageDelete> {
        const findData = { actorId, roomId, targetId };
        let deleted: boolean = false;

        const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET, true);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, roomActorData);
        };

        if (errors.length === 0) {
            const deleteTargetResult = await RoomUserService.delete(errors, roomId, targetId);
            deleted = deleteTargetResult.deleted;
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, deleted };
    };

    public static async leave(errors: TErrorList, actorId: number, roomId: number): Promise<TRoomManageLeave> {
        const findData = { actorId, roomId };
        let deleted: boolean = false;

        const { actorModel, actorData, roomModel, roomData, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, roomActorData, false);
        };

        if (errors.length === 0) {
            const deleteActorResult = await RoomUserService.delete(errors, roomId, actorId);
            deleted = deleteActorResult.deleted;
        };

        return { actorModel, actorData, roomModel, roomData, deleted };
    };

    public static async assignAdmin(errors: TErrorList, actorId: number, roomId: number, targetId: number): Promise<TRoomManageTarget> {
        const findData = { actorId, roomId, targetId };
        let roomTargetModel: TRoomUserModel = null;
        let roomTargetData: TRoomUserData = null;

        const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET, true);
        const updates: TRoomUserUpdates = { isAdmin: true };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, roomActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await RoomUserService.update(errors, roomId, targetId, updates);
            roomTargetModel = updateTargetResult.roomUserModel;
            roomTargetData = updateTargetResult.roomUserData;
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData };
    };

    public static async removeAdmin(errors: TErrorList, actorId: number, roomId: number, targetId: number): Promise<TRoomManageTarget> {
        const findData = { actorId, roomId, targetId };
        let roomTargetModel: TRoomUserModel = null;
        let roomTargetData: TRoomUserData = null;

        const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET, true);
        const updates: TRoomUserUpdates = { isAdmin: false };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, roomActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await RoomUserService.update(errors, roomId, targetId, updates);
            roomTargetModel = updateTargetResult.roomUserModel;
            roomTargetData = updateTargetResult.roomUserData;
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData };
    };

    public static async transferOwner(errors: TErrorList, actorId: number, roomId: number, targetId: number): Promise<TRoomManageTarget> {
        const findData = { actorId, roomId, targetId };

        const findResult = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET, true);
        const { actorModel, actorData, targetModel, targetData, roomModel, roomData } = findResult;
        let { roomActorModel, roomActorData, roomTargetModel, roomTargetData } = findResult;

        const updatesMakeOwner: TRoomUserUpdates = { isOwner: true };
        const updatesRemoveOwner: TRoomUserUpdates = { isOwner: false };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, roomActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await RoomUserService.update(errors, roomId, targetId, updatesMakeOwner);
            roomTargetModel = updateTargetResult.roomUserModel;
            roomTargetData = updateTargetResult.roomUserData;
            const updateActorResult = await RoomUserService.update(errors, roomId, actorId, updatesRemoveOwner);
            roomActorModel = updateActorResult.roomUserModel;
            roomActorData = updateActorResult.roomUserData;
        };

        return { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData };
    };

    public static async update(errors: TErrorList, actorId: number, roomId: number, updates: TRoomUpdates): Promise<TRoomManagement> {
        const findData = { actorId, roomId };
        let roomData: TRoomData = null;

        const { actorModel, actorData, roomModel, roomActorModel, roomActorData } = await this.find(errors, findData, ERoomManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!roomModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!roomActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, roomActorData);
        };

        if (errors.length === 0 && roomModel) {
            await roomModel.update(updates);
            roomData = roomModel.toJSON();
        };

        return { actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData };
    };

    public static async getUserAllRooms(errors: TErrorList, userId: number): Promise<TUserRooms> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId };
        let roomModelList: TRoomModelList = [];
        let roomDataList: TRoomDataList = [];

        if (errors.length === 0) {
            const getRoomsResult = await RoomUserService.getUserRooms(errors, conditions);
            roomModelList = getRoomsResult.roomModelList;
            roomDataList = getRoomsResult.roomDataList;
        };

        return { userModel, userData, roomModelList, roomDataList };
    };

    public static async getUserAdminRooms(errors: TErrorList, userId: number): Promise<TUserRooms> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId, isAdmin: true };
        let roomModelList: TRoomModelList = [];
        let roomDataList: TRoomDataList = [];

        if (errors.length === 0) {
            const getRoomsResult = await RoomUserService.getUserRooms(errors, conditions);
            roomModelList = getRoomsResult.roomModelList;
            roomDataList = getRoomsResult.roomDataList;
        };

        return { userModel, userData, roomModelList, roomDataList };
    };

    public static async getUserOwnerRooms(errors: TErrorList, userId: number): Promise<TUserRooms> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId, isOwner: true };
        let roomModelList: TRoomModelList = [];
        let roomDataList: TRoomDataList = [];

        if (errors.length === 0) {
            const getRoomsResult = await RoomUserService.getUserRooms(errors, conditions);
            roomModelList = getRoomsResult.roomModelList;
            roomDataList = getRoomsResult.roomDataList;
        };

        return { userModel, userData, roomModelList, roomDataList };
    };

    public static async getRoomMembers(errors: TErrorList, roomId: number): Promise<TRoomMembers> {
        const { roomModel, roomData } = await RoomService.get(errors, roomId);
        const conditions = { roomId };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await RoomUserService.getRoomMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { roomModel, roomData, userModelList, userDataList };
    };

    public static async getRoomAdmins(errors: TErrorList, roomId: number): Promise<TRoomMembers> {
        const { roomModel, roomData } = await RoomService.get(errors, roomId);
        const conditions = { roomId, isAdmin: true };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await RoomUserService.getRoomMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { roomModel, roomData, userModelList, userDataList };
    };

    public static async getRoomOwners(errors: TErrorList, roomId: number): Promise<TRoomMembers> {
        const { roomModel, roomData } = await RoomService.get(errors, roomId);
        const conditions = { roomId, isOwner: true };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await RoomUserService.getRoomMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { roomModel, roomData, userModelList, userDataList };
    };

    public static async getRoomTables(errors: TErrorList, roomId: number): Promise<TRoomTables> {
        const { roomModel, roomData } = await RoomService.get(errors, roomId);
        let tableModelList: TTableModelList = [];
        let tableDataList: TTableDataList = [];

        if (errors.length === 0 && roomModel && roomData) {
            const tableListResult = await TableService.getListByRoom(errors, roomId);
            tableModelList = tableListResult.tableModelList;
            tableDataList = tableListResult.tableDataList;
        };

        return { roomModel, roomData, tableModelList, tableDataList };
    };
};

export default RoomManagementService;