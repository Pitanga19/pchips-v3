// pchips-v3/src/relation/core/FriendService.ts

import {
    TFriendModelReturn, TRelationDeleteReturn, TFriendModelListReturn, TFriendServiceReturn, checkIsAccepted, checkIsSenderId,
} from '../relationIndex';
import {
    addToResponseErrors, TErrorList, EErrorField, EErrorMessage, EResponseStatus, EResponseMessage
} from '../../common/commonIndex';
import { UserModel, FriendModel, EFriendStatus } from '../../../db/dbIndex';
import { Op } from 'sequelize';

class FriendService {
    public static async find(firstUserId: number, secondUserId: number, errors: TErrorList): Promise<TFriendModelReturn> {
        const field = EErrorField.RELATION;
        let friendModel: TFriendModelReturn = null;

        if (firstUserId > secondUserId) {
            [firstUserId, secondUserId] = [secondUserId, firstUserId];
        };

        if (firstUserId === secondUserId) {
            console.log(`[FriendService] Is same ID: ${firstUserId}`);
            addToResponseErrors(errors, field, EErrorMessage.SAME_USER);
        } else {
            friendModel = await FriendModel.findOne({ where: { firstUserId, secondUserId } });
        };

        return friendModel;
    };

    public static async create(senderId: number, receiverId: number, errors: TErrorList): Promise<TFriendServiceReturn> {
        let status: EResponseStatus = EResponseStatus.CREATED;
        let message: EResponseMessage = EResponseMessage.CREATED;
        const field = EErrorField.RELATION;
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        let friendModel: TFriendModelReturn = null;
        
        try {
            friendModel = await FriendModel.create({ firstUserId, secondUserId, senderId });
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log(`[FriendService] Friend already exists: ${firstUserId} - ${secondUserId}`);
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;
                addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXISTS);
            } else {
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
                console.log(`[FriendService] Error creating Friend: ${firstUserId} - ${secondUserId}`);
                addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
            };
        };        

        return { status, friendModel, errors, message };
    };

    public static async get(senderId: number, receiverId: number, errors: TErrorList, expectedStatus: EFriendStatus, needCheckSender: boolean): Promise<TFriendServiceReturn> {
        let status: EResponseStatus = EResponseStatus.SUCCESS;
        let message: EResponseMessage = EResponseMessage.SUCCESS;
        const field = EErrorField.RELATION;
        const firstUserId = Math.min(senderId, receiverId);
        const secondUserId = Math.max(senderId, receiverId);
        const friendModel = await this.find(firstUserId, secondUserId, errors);
        
        if (!friendModel) {
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.NOT_FOUND;
            console.log(`[FriendService] Friend not found: ${firstUserId} - ${secondUserId}`);
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
        } else {
            if (expectedStatus === EFriendStatus.ACCEPTED && !checkIsAccepted(friendModel)) {
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;
                console.log(`[FriendService] Friend is pending: ${firstUserId} - ${secondUserId}`);
                addToResponseErrors(errors, field, EErrorMessage.RELATION_PENDING);
            };
            if (expectedStatus === EFriendStatus.PENDING && checkIsAccepted(friendModel)) {
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;
                console.log(`[FriendService] Friend already accepted: ${firstUserId} - ${secondUserId}`);
                addToResponseErrors(errors, field, EErrorMessage.RELATION_ACCEPTED);
            };
            if (needCheckSender && !checkIsSenderId(friendModel, senderId)) {
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;
                console.log(`[FriendService] Wrong sender: ${firstUserId}`);
                addToResponseErrors(errors, field, EErrorMessage.WRONG_SENDER);
            };
        };

        return { status, friendModel, errors, message };
    };

    public static async getFriendModelList(userId: number, friendStatus: EFriendStatus | null = null): Promise<TFriendModelListReturn> {
        const errors: TErrorList = [];
        let status: EResponseStatus = EResponseStatus.SUCCESS;
        let message: EResponseMessage = EResponseMessage.SUCCESS;
        let friendModelList: UserModel[] = [];

        const whereCondition: any = {
            [Op.or]: [{ firstUserId: userId }, { secondUserId: userId }],
        };
    
        if (friendStatus) {
            whereCondition.status = friendStatus;
        };

        const friendList = await FriendModel.findAll({
            where: whereCondition,
            include: [
                { model: UserModel, as: 'firstUser', required: false },
                { model: UserModel, as: 'secondUser', required: false },
            ],
        });
        
        friendModelList = friendList.map(f => 
            f.firstUserId === userId ? f.dataValues.secondUser : f.dataValues.firstUser
        ).filter(Boolean);

        console.log('[FriendService] Friends succesfully loaded\n', { status, friendModelList: friendModelList.map(f => f.toJSON()), errors, message });

        return { status, friendModelList, errors, message };
    };

    public static async delete(senderId: number, receiverId: number, expectedStatus: EFriendStatus, needCheckSender: boolean): Promise<TRelationDeleteReturn> {
        const errors: TErrorList = [];
        const friendGetResult = await this.get(senderId, receiverId, errors, expectedStatus, needCheckSender);
        const friendModel = friendGetResult.friendModel;
        let status = friendGetResult.status;
        let message = friendGetResult.message;
        let value = false;
    
        if (friendModel && errors.length === 0) {
            await friendModel.destroy();
            value = true;
            console.log(`[FriendService] Friend successfully deleted: ${senderId} - ${receiverId}`);
        };
    
        return { status, value, errors, message };
    };
};

export default FriendService;