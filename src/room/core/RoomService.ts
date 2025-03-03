// pchips-v3/src/room/core/RoomService.ts

import { TRoomData, TRoomDelete, TRoomModel, TRoomService, TRoomUpdates } from '../roomIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, showLog, TErrorList } from '../../common/commonIndex';
import { RoomModel } from '../../../db/dbIndex';

const file = 'RoomService';
const field = EErrorField.PARTY;

class RoomService {
    private static async find(errors: TErrorList, id: number, shouldExist: boolean): Promise<TRoomService> {
        const roomModel: TRoomModel = await RoomModel.findByPk(id);
        let roomData: TRoomData = null;

        if (roomModel) {
            roomData = roomModel.toJSON();
            if (!shouldExist) showLog(file, 'Room already exists', roomData, false);
        } else if (shouldExist && !roomModel) {
            showLog(file, 'Room not found', { id }, false);
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        };

        return { roomModel, roomData };
    };

    public static async create(errors: TErrorList, name: string): Promise<TRoomService> {
        const roomModel: TRoomModel = await RoomModel.create({ name });
        let roomData: TRoomData = null;

        if (roomModel) {
            roomData = roomModel.toJSON();
            showLog(file, 'Room successfully created', roomData, true);
        } else {
            showLog(file, 'Error creating room', { name }, false);
            addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        return { roomModel, roomData };
    };

    public static async get(errors: TErrorList, id: number): Promise<TRoomService> {
        const findResult = await this.find(errors, id, true);
        const { roomModel, roomData } = findResult;

        if (errors.length === 0 && roomData) {
            showLog(file, 'Room successfully retrieved', roomData, true);
        };

        return { roomModel, roomData };
    };

    public static async update(errors: TErrorList, id: number, updates: TRoomUpdates): Promise<TRoomService> {
        const getRoomResult = await this.get(errors, id);
        const { roomModel } = getRoomResult;
        let { roomData } = getRoomResult;

        if (errors.length === 0 && roomModel && roomData) {
            await roomModel.update(updates);
            roomData = roomModel.toJSON();
            showLog(file, 'Room successfully updated', roomData, true);
        };

        return { roomModel, roomData };
    };

    public static async delete(errors: TErrorList, id: number): Promise<TRoomDelete> {
        const getRoomResult = await this.get(errors, id);
        const { roomModel } = getRoomResult;
        let { roomData } = getRoomResult;
        let deleted = false;

        if (errors.length === 0 && roomModel && roomData) {
            await roomModel.destroy();
            deleted = true;
            showLog(file, 'Room successfully deleted', roomData, true);
        };

        return { deleted };
    };
};

export default RoomService;