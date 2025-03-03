// pchips-v3/src/room/core/RoomUserService.ts

import { UserModel, RoomModel, RoomUserModel } from '../../../db/dbIndex';
import {
    TRoomUserListConditions, TRoomUserDelete, TRoomUserModel, TRoomUserService, TRoomUserUpdates, TUserRoomListConditions, TRoomUserData, TRoomModelList, TRoomDataList, TUserRooms, TRoomMembers, TRoomService, RoomService, TRoomData, TRoomModel,
} from '../roomIndex';
import {
    addToResponseErrors, EErrorField, EErrorMessage, showLog, TErrorList,
} from '../../common/commonIndex';
import { TUserData, TUserDataList, TUserModel, TUserModelList, TUserService, UserService } from '../../auth/authIndex';

const file = 'RoomUserService';
const field = EErrorField.PARTY_USER;

class RoomUserService {
    private static async findRoomUser(roomId: number, userId: number): Promise<TRoomUserService> {
        const roomUserModel: TRoomUserModel = await RoomUserModel.findOne({ where: { roomId, userId }});
        const roomUserData: TRoomUserData = roomUserModel ? roomUserModel.toJSON() : null;

        return { roomUserModel, roomUserData };
    };

    private static validateFindResult(errors: TErrorList, findResult: TRoomUserService, roomId: number, userId: number, shouldExist: boolean): void {
        const { roomUserModel } = findResult;

        if (shouldExist && !roomUserModel) {
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
            showLog(file, 'RoomUser not found', { roomId, userId }, false);
        } else if (!shouldExist && roomUserModel) {
            addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
            showLog(file, 'RoomUser already exists', { roomId, userId }, false);
        };
    };

    public static async find(errors: TErrorList, roomId: number, userId: number, shouldExist: boolean): Promise<TRoomUserService> {
        const findResult = await this.findRoomUser(roomId, userId);
        this.validateFindResult(errors, findResult, roomId, userId, shouldExist);

        return findResult;
    };

    public static async create(errors: TErrorList, roomId: number, userId: number, isOwner: boolean = false): Promise<TRoomUserService> {
        let { roomUserModel, roomUserData } = await this.find(errors, roomId, userId, false);
        
        if (errors.length === 0) {
            roomUserModel = await RoomUserModel.create({ roomId, userId, isOwner });

            if (roomUserModel) {
                roomUserData = roomUserModel.toJSON();
                showLog(file, 'RoomUser successfully created', roomUserData, true);
            } else {
                showLog(file, 'Error creating RoomUser', { roomId, userId }, false);
                addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
            };
        };

        return { roomUserModel, roomUserData };
    };

    public static async get(errors: TErrorList, roomId: number, userId: number): Promise<TRoomUserService> {
        let { roomUserModel, roomUserData } = await this.find(errors, roomId, userId, true);
        
        if (errors.length === 0 && roomUserData) {
            showLog(file, 'RoomUser successfully retrieved', roomUserData, true);
        };

        return { roomUserModel, roomUserData };
    };

    public static async update(errors: TErrorList, roomId: number, userId: number, updates: TRoomUserUpdates): Promise<TRoomUserService> {
        const getRoomUserResult = await this.get(errors, roomId, userId);
        const { roomUserModel } = getRoomUserResult;
        let { roomUserData } = getRoomUserResult;

        if (errors.length === 0 && roomUserModel && roomUserData) {
            await roomUserModel.update(updates);
            roomUserData = roomUserModel.toJSON();
            showLog(file, 'RoomUser successfully updated', roomUserData, true);
        };

        return { roomUserModel, roomUserData };
    };

    public static async getUserRooms(errors: TErrorList, conditions: TUserRoomListConditions): Promise<TUserRooms> {
        const { userId } = conditions;
        let userModel: TUserModel = null;
        let userData: TUserData = null;
        let roomModelList: TRoomModelList = [];
        let roomDataList: TRoomDataList = [];
        
        let userResult: TUserService = { userModel, userData };
        if (userId) userResult = await UserService.getById(errors, userId);

        if (errors.length === 0 && userResult.userModel && userResult.userData) {
            const roomUserModelList = await RoomUserModel.findAll({
                where: conditions,
                include: [
                    { model: RoomModel, as: 'room', required: false },
                ],
            });

            roomModelList = roomUserModelList.map(pu => pu.dataValues.room);
            roomDataList = roomModelList.map(p => p.toJSON());
        };

        return { userModel, userData, roomModelList, roomDataList };
    };

    public static async getRoomMembers(errors: TErrorList, conditions: TRoomUserListConditions): Promise<TRoomMembers> {
        const { roomId } = conditions;
        let roomModel: TRoomModel = null;
        let roomData: TRoomData = null;
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];
        
        let roomResult: TRoomService = { roomModel, roomData };
        if (roomId) roomResult = await RoomService.get(errors, roomId);

        if (errors.length === 0 && roomResult.roomModel && roomResult.roomData) {
            const roomUserModelList = await RoomUserModel.findAll({
                where: conditions,
                include: [
                    { model: UserModel, as: 'user', required: false },
                ],
            });

            userModelList = roomUserModelList.map(pu => pu.dataValues.user);
            userDataList = userModelList.map(u => u.toJSON());
        };

        return { roomModel, roomData, userModelList, userDataList };
    };

    public static async delete(errors: TErrorList, roomId: number, userId: number): Promise<TRoomUserDelete> {
        const getRoomUserResult = await this.get(errors, roomId, userId);
        const { roomUserModel } = getRoomUserResult;
        let { roomUserData } = getRoomUserResult;
        let deleted = false;

        if (errors.length === 0 && roomUserModel && roomUserData) {
            await roomUserModel.destroy();
            deleted = true;
            showLog(file, 'RoomUser successfully deleted', roomUserData, true);
        };

        return { deleted };
    };
};

export default RoomUserService;