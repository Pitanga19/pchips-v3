// pchips-v3/src/relation/core/RelationService.ts

import {
    FriendService, BlockService, TRelationFriendReturn, TRelationFriendListReturn, TRelationBlockReturn, TRelationBlockListReturn, TRelationDeleteReturn, TFriendReturn, TBlockModelReturn,
} from '../relationIndex';
import { TErrorList, EResponseStatus, EResponseMessage } from '../../common/commonIndex';
import { EFriendStatus } from '../../../db/dbIndex';

class RelationService {
    public static async sendFriendRequest(senderId: number, receiverId: number): Promise<TRelationFriendReturn> {
        const errors: TErrorList = [];
        const friendCreateResult = await FriendService.create(senderId, receiverId, errors);
        const friendModel = friendCreateResult.friendModel;
        let friend: TFriendReturn = null;
        let status = friendCreateResult.status;
        let message = friendCreateResult.message;

        if (friendModel && errors.length === 0) {
            console.log(`[RelationService] Friend request succesfully sended: ${senderId} - ${receiverId}`);
            friend = friendModel.toJSON();
        };

        return { status, friend, errors, message };
    };

    public static async cancelFriendRequest(senderId: number, receiverId: number): Promise<TRelationDeleteReturn> {
        return FriendService.delete(senderId, receiverId, EFriendStatus.PENDING, true);
    };
    
    public static async rejectFriendRequest(senderId: number, receiverId: number): Promise<TRelationDeleteReturn> {
        return FriendService.delete(senderId, receiverId, EFriendStatus.PENDING, true);
    };
    
    public static async acceptFriendRequest(senderId: number, receiverId: number): Promise<TRelationFriendReturn> {
        const errors: TErrorList = [];
        const friendGetResult = await FriendService.get(senderId, receiverId, errors, EFriendStatus.PENDING, true);
        const friendModel = friendGetResult.friendModel;
        let friend: TFriendReturn = null;
        let status = friendGetResult.status;
        let message = friendGetResult.message;

        if (friendModel && errors.length === 0) {
            await friendModel.update({ status: EFriendStatus.ACCEPTED });
            console.log(`[RelationService] Friend succesfully accepted: ${senderId} - ${receiverId}`);
            friend = friendModel.toJSON();
        };

        return { status, friend, errors, message };
    };
        
    public static async removeFriend(firstUserId: number, secondUserId: number): Promise<TRelationDeleteReturn> {
        return await FriendService.delete(firstUserId, secondUserId, EFriendStatus.ACCEPTED, false);
    };

    public static async blockUser(blockerId: number, blockedId: number): Promise<TRelationBlockReturn> {
        const status: EResponseStatus = EResponseStatus.INTERNAL_SERVER_ERROR;
        const block: TBlockModelReturn = null;
        const errors: TErrorList = [];
        const message: EResponseMessage = EResponseMessage.INTERNAL_SERVER_ERROR;

        const findFriendResult = await FriendService.find(blockerId, blockedId, errors);
        if (findFriendResult) findFriendResult.destroy();

        if (errors.length > 0) {
            return { status, block, errors, message };
        };

        const createBlockResult = await BlockService.create(blockerId, blockedId);
        if (!createBlockResult.blockModel) {
            console.log(`[AuthService] Error blocking user: ${blockerId} to ${blockedId}\n`);
            return {
                status: createBlockResult.status,
                block: createBlockResult.blockModel,
                errors: createBlockResult.errors,
                message: createBlockResult.message,
            };
        };

        console.log(`[AuthService] User successfully blocked: ${blockerId} to ${blockedId}\n`);
        return {
            status: createBlockResult.status,
            block: createBlockResult.blockModel.toJSON(),
            errors: createBlockResult.errors,
            message: createBlockResult.message,
        };
    };

    public static async unblockUser(blockerId: number, blockedId: number): Promise<TRelationDeleteReturn> {
        return await BlockService.delete(blockerId, blockedId);
    };

    public static async getCompleteFriendList(userId: number): Promise<TRelationFriendListReturn> {
        const getFriendModelListResult = await FriendService.getFriendModelList(userId);
        const status = getFriendModelListResult.status;
        const friendList = getFriendModelListResult.friendModelList.map(f => f.toJSON());
        const errors = getFriendModelListResult.errors;
        const message = getFriendModelListResult.message;

        return { status, friendList, errors, message };
    };

    public static async getAcceptedFriendList(userId: number): Promise<TRelationFriendListReturn> {
        const getFriendModelListResult = await FriendService.getFriendModelList(userId, EFriendStatus.ACCEPTED);
        const status = getFriendModelListResult.status;
        const friendList = getFriendModelListResult.friendModelList.map(f => f.toJSON());
        const errors = getFriendModelListResult.errors;
        const message = getFriendModelListResult.message;

        return { status, friendList, errors, message };
    };

    public static async getPendingFriendList(userId: number): Promise<TRelationFriendListReturn> {
        const getFriendModelListResult = await FriendService.getFriendModelList(userId, EFriendStatus.PENDING);
        const status = getFriendModelListResult.status;
        const friendList = getFriendModelListResult.friendModelList.map(f => f.toJSON());
        const errors = getFriendModelListResult.errors;
        const message = getFriendModelListResult.message;

        return { status, friendList, errors, message };
    };

    public static async getBlockedList(userId: number): Promise<TRelationBlockListReturn> {
        const getBlockedModelListResult = await BlockService.getBlockedModelList(userId);
        const status = getBlockedModelListResult.status;
        const blockedList = getBlockedModelListResult.blockedModelList.map(b => b.toJSON());
        const errors = getBlockedModelListResult.errors;
        const message = getBlockedModelListResult.message;

        return { status, blockedList, errors, message };
    };
};

export default RelationService;