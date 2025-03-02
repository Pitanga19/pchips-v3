// pchips-v3/src/relation/core/RelationController.ts

import { Request, Response } from 'express';
import { RelationService, TRelationBlockBody, TRelationFriendBody, TRelationListBody } from '../relationIndex';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';

class RelationController {
    public static async sendFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { friendModel, friendData } = await RelationService.sendFriendRequest(errors, senderId, receiverId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ friendModel, friendData, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };
    
    public static async cancelFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { deleted } = await RelationService.cancelFriendRequest(errors, senderId, receiverId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ deleted, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async acceptFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { friendModel, friendData } = await RelationService.acceptFriendRequest(errors, senderId, receiverId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ friendModel, friendData, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async rejectFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { deleted } = await RelationService.rejectFriendRequest(errors, senderId, receiverId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ deleted, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async removeFriend(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { deleted } = await RelationService.removeFriend(errors, senderId, receiverId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ deleted, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async blockUser(req: Request, res: Response): Promise<void> {
        const { blockerId, blockedId }: TRelationBlockBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { blockModel, blockData } = await RelationService.blockUser(errors, blockerId, blockedId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ blockModel, blockData, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async unblockUser(req: Request, res: Response): Promise<void> {
        const { blockerId, blockedId }: TRelationBlockBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { deleted } = await RelationService.unblockUser(errors, blockerId, blockedId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ deleted, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async getAcceptedFriendList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData, friendModelList, friendDataList } = await RelationService.getAcceptedFriendList(errors, userId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, friendModelList, friendDataList, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async getPendingFriendList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData, friendModelList, friendDataList } = await RelationService.getPendingFriendList(errors, userId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, friendModelList, friendDataList, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };

    public static async getBlockedList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;
        const expectedOk = EResponseStatus.SUCCESS;
        const errors: TErrorList = [];

        try {
            const { userModel, userData, blockedModelList, blockedDataList } = await RelationService.getBlockedList(errors, userId);
            const status = handleResponseStatus(errors, expectedOk);

            res.status(status).json({ userModel, userData, blockedModelList, blockedDataList, errors });
        } catch (error){
            res.status(500).json({ error });
        };
    };
};

export default RelationController;