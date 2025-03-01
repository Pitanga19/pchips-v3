// pchips-v3/src/relation/core/RelationController.ts

import { Request, Response } from 'express';
import { RelationService, TRelationBlockBody, TRelationFriendBody, TRelationListBody } from '../relationIndex';
import { EResponseMessage } from '../../common/commonIndex';

class RelationController {
    public static async sendFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;

        try {
            const { status, friend, errors, message } = await RelationService.sendFriendRequest(senderId, receiverId);

            res.status(status).json({ friend, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
    
    public static async cancelFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;

        try {
            const { status, value, errors, message } = await RelationService.cancelFriendRequest(senderId, receiverId);

            res.status(status).json({ value, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async acceptFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;

        try {
            const { status, friend, errors, message } = await RelationService.acceptFriendRequest(senderId, receiverId);

            res.status(status).json({ friend, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async rejectFriendRequest(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;

        try {
            const { status, value, errors, message } = await RelationService.rejectFriendRequest(senderId, receiverId);

            res.status(status).json({ value, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async removeFriend(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId }: TRelationFriendBody = req.body;

        try {
            const { status, value, errors, message } = await RelationService.removeFriend(senderId, receiverId);

            res.status(status).json({ value, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async blockUser(req: Request, res: Response): Promise<void> {
        const { blockerId, blockedId }: TRelationBlockBody = req.body;

        try {
            const { status, block, errors, message } = await RelationService.blockUser(blockerId, blockedId);

            res.status(status).json({ block, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async unblockUser(req: Request, res: Response): Promise<void> {
        const { blockerId, blockedId }: TRelationBlockBody = req.body;

        try {
            const { status, value, errors, message } = await RelationService.unblockUser(blockerId, blockedId);

            res.status(status).json({ value, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getAcceptedFriendList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;

        try {
            const { status, friendList, errors, message } = await RelationService.getAcceptedFriendList(userId);

            res.status(status).json({ friendList, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getPendingFriendList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;

        try {
            const { status, friendList, errors, message } = await RelationService.getPendingFriendList(userId);

            res.status(status).json({ friendList, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };

    public static async getBlockedList(req: Request, res: Response): Promise<void> {
        const { userId }: TRelationListBody = req.body;

        try {
            const { status, blockedList, errors, message } = await RelationService.getBlockedList(userId);

            res.status(status).json({ blockedList, errors, message });
        } catch (error){
            res.status(500).json({ error, message: EResponseMessage.INTERNAL_SERVER_ERROR });
        };
    };
};

export default RelationController;