// pchips-v3/src/relation/core/FriendService.ts

import {
    TFriendModel, TRelationDelete, TFriendList, TFriendService, checkIsAccepted, checkIsSenderId, TFriendFindData, TFriendFindResult, TFriendData, TFriendUpdates,
} from '../relationIndex';
import {
    addToResponseErrors, TErrorList, EErrorField, EErrorMessage, showLog,
} from '../../common/commonIndex';
import { UserModel, FriendModel, EFriendStatus } from '../../../db/dbIndex';
import { Op } from 'sequelize';
import { TUserDataList, TUserModelList, UserService } from '../../auth/authIndex';

const file = 'FriendService';
const field = EErrorField.FRIEND;

class FriendService {
    // Find friendship
    public static async findFriend(errors: TErrorList, data: TFriendFindData): Promise<TFriendFindResult> {
        let { firstUserId, secondUserId } = data;
        let friendModel: TFriendModel = null;
        let friendData: TFriendData = null;

        if (firstUserId === secondUserId) {
            showLog(file, 'Is same ID', { firstUserId, secondUserId }, false);
            addToResponseErrors(errors, field, EErrorMessage.SAME_USER);
        } else {
            if (firstUserId > secondUserId) {
                [firstUserId, secondUserId] = [secondUserId, firstUserId];
            };

            friendModel = await FriendModel.findOne({ where: { firstUserId, secondUserId } });
            if (friendModel) friendData = friendModel.toJSON();
        };

        return { friendModel, friendData };
    };

    // Validate find result
    private static validateFindResult(errors: TErrorList, data: TFriendFindData, findResult: TFriendFindResult, shouldExists: boolean): void {
        if (shouldExists && !findResult.friendModel) {
            showLog(file, 'Friend not found', data, false);
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        } else if (!shouldExists && findResult.friendModel) {
            showLog(file, 'Friend already exist', data, false);
            addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
        };
    };

    // Find friendship and validate
    public static async find(errors: TErrorList, data: TFriendFindData, shouldExists: boolean): Promise<TFriendService> {
        const findResult = await this.findFriend(errors, data);
        this.validateFindResult(errors, data, findResult, shouldExists);
        return findResult;
    };

    public static async create(errors: TErrorList, senderId: number, receiverId: number): Promise<TFriendService> {
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        const findData = { firstUserId, secondUserId };
        const findResult = await this.find(errors, findData, false);
        let friendModel: TFriendModel = null;
        let friendData: TFriendData = null;

        if (errors.length === 0) {
            friendModel = await FriendModel.create({ firstUserId, secondUserId, senderId });

            if (!friendModel) {
                showLog(file, 'Error creating friend', { senderId, receiverId }, false);
                addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
            } else {
                friendData = friendModel.toJSON();
                showLog(file, 'Friend successfully created', friendData, true);
            };
        };

        return { friendModel, friendData };
    };

    public static async get(errors: TErrorList, senderId: number, receiverId: number, expectedStatus: EFriendStatus, needCheckSender: boolean): Promise<TFriendService> {
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        const findData = { firstUserId, secondUserId };
        const { friendModel, friendData} = await this.find(errors, findData, true);

        if (friendModel) {
            if (expectedStatus === EFriendStatus.ACCEPTED && !checkIsAccepted(friendModel)) {
                showLog(file, 'Friend is pending', findData, false);
                addToResponseErrors(errors, field, EErrorMessage.RELATION_PENDING);
            };

            if (expectedStatus === EFriendStatus.PENDING && checkIsAccepted(friendModel)) {
                showLog(file, 'Friend is already accepted', findData, false);
                addToResponseErrors(errors, field, EErrorMessage.RELATION_ACCEPTED);
            };

            if (needCheckSender && !checkIsSenderId(friendModel, senderId)) {
                showLog(file, 'Wrong sender', findData, false);
                addToResponseErrors(errors, field, EErrorMessage.WRONG_SENDER);
            };
        };

        return { friendModel, friendData };
    };

    public static async update(errors: TErrorList, senderId: number, receiverId: number, updates: TFriendUpdates, expectedStatus: EFriendStatus, needCheckSender: boolean): Promise<TFriendService> {
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        const getFriendResult = await this.get(errors, firstUserId, secondUserId, expectedStatus, needCheckSender);
        const { friendModel } = getFriendResult;
        let { friendData } = getFriendResult;

        if (errors.length === 0 && friendModel && friendData) {
            showLog(file, 'Friend successfully loaded', friendData, true);
            
            await friendModel.update(updates);
            friendData = friendModel.toJSON();
            showLog(file, 'Friend successfully updated', friendData, true);
        };

        return { friendModel, friendData };
    };

    public static async getFriendModelList(errors: TErrorList, userId: number, friendStatus: EFriendStatus | null = null): Promise<TFriendList> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        let friendModelList: TUserModelList = [];
        let friendDataList: TUserDataList = [];

        const whereCondition: any = {
            [Op.or]: [{ firstUserId: userId }, { secondUserId: userId }],
        };
    
        if (friendStatus) {
            whereCondition.status = friendStatus;
        };

        const friendshipList = await FriendModel.findAll({
            where: whereCondition,
            include: [
                { model: UserModel, as: 'firstUser', required: false },
                { model: UserModel, as: 'secondUser', required: false },
            ],
        });
        
        friendModelList = friendshipList.map(f => 
            f.firstUserId === userId ? f.dataValues.secondUser : f.dataValues.firstUser
        ).filter(Boolean);
        friendDataList = friendModelList.map(f => f.toJSON());

        showLog(file, 'Friends successfully loaded', friendDataList, true);

        return { userModel, userData, friendModelList, friendDataList };
    };

    public static async delete(errors: TErrorList, senderId: number, receiverId: number, expectedStatus: EFriendStatus, needCheckSender: boolean): Promise<TRelationDelete> {
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        const getFriendResult = await this.get(errors, firstUserId, secondUserId, expectedStatus, needCheckSender);
        const { friendModel } = getFriendResult;
        let { friendData } = getFriendResult;
        let deleted: boolean = false;

        if (errors.length === 0 && friendModel && friendData) {
            showLog(file, 'Friend successfully loaded', friendData, true);
            
            await friendModel.destroy();
            deleted = true;
            showLog(file, 'Friend successfully deleted.', { firstUserId, secondUserId }, true);
        };

        return { deleted };
    };
};

export default FriendService;