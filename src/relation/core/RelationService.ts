// pchips-v3/src/relation/core/RelationService.ts

import {
    FriendService, BlockService, TRelationFriend, TRelationFriendList, TRelationBlock, TRelationBlockList, TRelationDelete,
    TFriendData,
    TFriendModel,
} from '../relationIndex';
import { TErrorList, showLog } from '../../common/commonIndex';
import { EFriendStatus } from '../../../db/dbIndex';

const file = 'RelationService';

class RelationService {
    public static async sendFriendRequest(errors: TErrorList, senderId: number, receiverId: number): Promise<TRelationFriend> {
        BlockService.validateExistence(errors, senderId, receiverId);
        let friendModel: TFriendModel = null;
        let friendData: TFriendData = null;

        if (errors.length === 0) {
            const createResult = await FriendService.create(errors, senderId, receiverId);
            friendModel = createResult.friendModel;
            friendData = createResult.friendData;

            if (friendModel && friendData) {
                showLog(file, 'Friend request succesfully sended', friendData, true);
            };
        };

        return { friendModel, friendData };
    };

    public static async cancelFriendRequest(errors: TErrorList, senderId: number, receiverId: number): Promise<TRelationDelete> {
        const { deleted } = await FriendService.delete(errors, senderId, receiverId, EFriendStatus.PENDING, true);
        const details = { senderId, receiverId };

        if (errors.length === 0 && deleted) {
            showLog(file, 'Friend request succesfully canceled', details, true);
        };

        return { deleted };
    };
    
    public static async acceptFriendRequest(errors: TErrorList, senderId: number, receiverId: number): Promise<TRelationFriend> {
        const getFriendResult = await FriendService.get(errors, senderId, receiverId, EFriendStatus.PENDING, true);
        const { friendModel } = getFriendResult;
        let { friendData } = getFriendResult;
        const updates = { status: EFriendStatus.ACCEPTED };

        if (errors.length === 0 && friendModel && friendData) {
            await friendModel.update(updates);
            friendData = friendModel.toJSON();
            showLog(file, 'Friend request succesfully accepted', friendData, true);
        };

        return { friendModel, friendData };
    };
    
    public static async rejectFriendRequest(errors: TErrorList, senderId: number, receiverId: number): Promise<TRelationDelete> {
        const { deleted } = await FriendService.delete(errors, senderId, receiverId, EFriendStatus.PENDING, true);
        const details = { senderId, receiverId };

        if (errors.length === 0 && deleted) {
            showLog(file, 'Friend request succesfully rejected', details, true);
        };

        return { deleted };
    };

    public static async removeFriend(errors: TErrorList, firstUserId: number, secondUserId: number): Promise<TRelationDelete> {
        const { deleted } = await FriendService.delete(errors, firstUserId, secondUserId, EFriendStatus.ACCEPTED, false);
        const details = { firstUserId, secondUserId };

        if (errors.length === 0 && deleted) {
            showLog(file, 'Friend request succesfully rejected', details, true);
        };

        return { deleted };
    };

    public static async blockUser(errors: TErrorList, blockerId: number, blockedId: number): Promise<TRelationBlock> {
        const findFriendData = { firstUserId: blockerId, secondUserId: blockedId };
        const { friendModel } = await FriendService.findFriend(errors, findFriendData);
        if (friendModel) await friendModel.destroy();

        const { blockModel, blockData } = await BlockService.create(errors, blockerId, blockedId);

        if (errors.length === 0 && blockModel && blockData) {
            showLog(file, 'User succesfully blocked', blockData, true);
        };

        return { blockModel, blockData };
    };

    public static async unblockUser(errors: TErrorList, blockerId: number, blockedId: number): Promise<TRelationDelete> {
        const { deleted } = await BlockService.delete(errors, blockerId, blockedId);
        const details = { blockerId, blockedId };

        if (errors.length === 0 && deleted) {
            showLog(file, 'User succesfully unblocked', details, true);
        };

        return { deleted };
    };

    public static async getCompleteFriendList(errors: TErrorList, userId: number): Promise<TRelationFriendList> {
        const { userModel, userData, friendModelList, friendDataList } = await FriendService.getFriendList(errors, userId);

        if (errors.length === 0 && userModel && userData && friendModelList && friendDataList) {
            showLog(file, 'Friends for user', userData, true);
            showLog(file, 'Friends list getted', friendDataList, true);
        };

        return { userModel, userData, friendModelList, friendDataList };
    };

    public static async getAcceptedFriendList(errors: TErrorList, userId: number): Promise<TRelationFriendList> {
        const { userModel, userData, friendModelList, friendDataList } = await FriendService.getFriendList(errors, userId, EFriendStatus.ACCEPTED);

        if (errors.length === 0 && userModel && userData && friendModelList && friendDataList) {
            showLog(file, 'Friends for user', userData, true);
            showLog(file, 'Friends list getted', friendDataList, true);
        };

        return { userModel, userData, friendModelList, friendDataList };
    };

    public static async getPendingFriendList(errors: TErrorList, userId: number): Promise<TRelationFriendList> {
        const { userModel, userData, friendModelList, friendDataList } = await FriendService.getFriendList(errors, userId, EFriendStatus.PENDING);

        if (errors.length === 0 && userModel && userData && friendModelList && friendDataList) {
            showLog(file, 'Friends for user', userData, true);
            showLog(file, 'Friends list getted', friendDataList, true);
        };

        return { userModel, userData, friendModelList, friendDataList };
    };

    public static async getBlockedList(errors: TErrorList, userId: number): Promise<TRelationBlockList> {
        const { userModel, userData, blockedModelList, blockedDataList } = await BlockService.getBlockedList(errors, userId);

        if (errors.length === 0 && userModel && userData && blockedModelList && blockedDataList) {
            showLog(file, 'Blocked users for user', userData, true);
            showLog(file, 'Blocked users list getted', blockedDataList, true);
        };

        return { userModel, userData, blockedModelList, blockedDataList };
    };
};

export default RelationService;