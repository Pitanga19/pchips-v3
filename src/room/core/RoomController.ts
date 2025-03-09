// pchips-v3/src/room/core/RoomController.ts

import { Request, Response } from 'express';
import {
    RoomManagementService, TRoomCreateBody, TRoomManageBody, TRoomUpdateBody, TRoomMembersBody, TRoomSelfBody, TUserRoomsBody,
    TRoomTablesBody,
} from '../roomIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class RoomController {
    public static async create(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomName }: TRoomCreateBody = req.body;

        try {
            const { actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData } = await RoomManagementService.create(errors, actorId, roomName);
            const expectedOk = EResponseStatus.CREATED;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async addUser(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, targetId }: TRoomManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData } = await RoomManagementService.addUser(errors, actorId, roomId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async removeUser(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, targetId }: TRoomManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, deleted } = await RoomManagementService.removeUser(errors, actorId, roomId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, deleted, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async leave(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId }: TRoomSelfBody = req.body;

        try {
            const { actorModel, actorData, roomModel, roomData, deleted } = await RoomManagementService.leave(errors, actorId, roomId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, roomModel, roomData, deleted, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async assignAdmin(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, targetId }: TRoomManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData } = await RoomManagementService.assignAdmin(errors, actorId, roomId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async removeAdmin(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, targetId }: TRoomManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData } = await RoomManagementService.removeAdmin(errors, actorId, roomId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async transferOwner(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, targetId }: TRoomManageBody = req.body;

        try {
            const { actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData } = await RoomManagementService.transferOwner(errors, actorId, roomId, targetId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, targetModel, targetData, roomModel, roomData, roomActorModel, roomActorData, roomTargetModel, roomTargetData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { actorId, roomId, updates }: TRoomUpdateBody = req.body;

        try {
            const { actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData } = await RoomManagementService.update(errors, actorId, roomId, updates);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ actorModel, actorData, roomModel, roomData, roomActorModel, roomActorData, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserAllRooms(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserRoomsBody = req.body;

        try {
            const { userModel, userData, roomModelList, roomDataList } = await RoomManagementService.getUserAllRooms(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, roomModelList, roomDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserAdminRooms(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserRoomsBody = req.body;

        try {
            const { userModel, userData, roomModelList, roomDataList } = await RoomManagementService.getUserAdminRooms(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, roomModelList, roomDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getUserOwnerRooms(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { userId }: TUserRoomsBody = req.body;

        try {
            const { userModel, userData, roomModelList, roomDataList } = await RoomManagementService.getUserOwnerRooms(errors, userId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, roomModelList, roomDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getRoomMembers(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { roomId }: TRoomMembersBody = req.body;

        try {
            const { roomModel, roomData, userModelList, userDataList } = await RoomManagementService.getRoomMembers(errors, roomId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ roomModel, roomData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getRoomAdmins(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { roomId }: TRoomMembersBody = req.body;

        try {
            const { roomModel, roomData, userModelList, userDataList } = await RoomManagementService.getRoomAdmins(errors, roomId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ roomModel, roomData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getRoomOwners(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { roomId }: TRoomMembersBody = req.body;

        try {
            const { roomModel, roomData, userModelList, userDataList } = await RoomManagementService.getRoomOwners(errors, roomId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ roomModel, roomData, userModelList, userDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };

    public static async getRoomTables(req: Request, res: Response): Promise<void> {
        const errors: TErrorList = [];
        const { roomId }: TRoomTablesBody = req.body;

        try {
            const { roomModel, roomData, tableModelList, tableDataList } = await RoomManagementService.getRoomTables(errors, roomId);
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ roomModel, roomData, tableModelList, tableDataList, errors });
        } catch (error) {
            res.status(500).json({ error });
        };
    };
};

export default RoomController;