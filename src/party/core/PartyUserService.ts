// pchips-v3/src/party/core/PartyUserService.ts

import {
    TPartyUserListConditions, TPartyUserDeleteReturn, TPartyUserModelListReturn, TPartyUserModelReturn, TPartyUserServiceReturn, TPartyUserUpdates, TUserPartyModelListReturn, TUserPartyListConditions,
} from '../partyIndex';
import { EResponseMessage, EResponseStatus, TErrorList } from '../../common/commonIndex';
import { UserModel, PartyModel, PartyUserModel } from '../../../db/dbIndex';

class PartyUserService {
    public static async create(partyId: number, userId: number, isOwner: boolean = false): Promise<TPartyUserServiceReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.CREATED;
        let message = EResponseMessage.CREATED;

        const partyUserModel: TPartyUserModelReturn = await PartyUserModel.create({ partyId, userId, isOwner, isAdmin: false });

        if (!partyUserModel) {
            console.log(`[PartyUserService] Error creating partyUser: { partyId: ${partyId} - userId: ${userId} }`);
            status = EResponseStatus.INTERNAL_SERVER_ERROR;
            message = EResponseMessage.INTERNAL_SERVER_ERROR;
        } else {
            console.log(`[PartyUserService] Successfully create partyUser: { partyId: ${partyId} - userId: ${userId} }`);
        };

        return { status, partyUserModel, errors, message };
    };

    public static async get(partyId: number, userId: number): Promise<TPartyUserServiceReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;

        const partyUserModel: TPartyUserModelReturn = await PartyUserModel.findOne({ where: { partyId, userId }});

        if (!partyUserModel) {
            console.log(`[PartyUserService] PartyUser not found: { partyId: ${partyId} - userId: ${userId} }`);
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.INVALID_DATA;
        } else {
            console.log(`[PartyUserService] Successfully get partyUser: { partyId: ${partyId} - userId: ${userId} }`);
        };

        return { status, partyUserModel, errors, message };
    };

    public static async update(partyId: number, userId: number, updates: TPartyUserUpdates): Promise<TPartyUserServiceReturn> {
        const { status, partyUserModel, errors, message } = await this.get(partyId, userId);
        
        if (partyUserModel) {
            await partyUserModel.update(updates);
            console.log(`[PartyUserService] Successfully update partyUser: { partyId: ${partyId} - userId: ${userId} }`);
        };

        return { status, partyUserModel, errors, message };
    };

    public static async delete(partyId: number, userId: number): Promise<TPartyUserDeleteReturn> {
        const { status, partyUserModel, errors, message } = await this.get(partyId, userId);
        let value: boolean = false;
        
        if (partyUserModel) {
            await partyUserModel.destroy();
            value = true;
            console.log(`[PartyUserService] Successfully delete partyUser: { partyId: ${partyId} - userId: ${userId} }`);
        };

        return { status, value, errors, message };
    };

    public static async getUserParties(conditions: TUserPartyListConditions): Promise<TUserPartyModelListReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;

        const partyUserModelList = await PartyUserModel.findAll({
            where: conditions,
            include: [
                { model: PartyModel, as: 'party', required: false },
            ],
        });

        const partyModelList = partyUserModelList.map(pu => pu.dataValues.party);

        return { status, partyModelList, errors, message }
    };

    public static async getPartyUsers(conditions: TPartyUserListConditions): Promise<TPartyUserModelListReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;

        const partyUserModelList = await PartyUserModel.findAll({
            where: conditions,
            include: [
                { model: UserModel, as: 'user', required: false },
            ],
        });

        const userModelList = partyUserModelList.map(pu => pu.dataValues.user);

        return { status, userModelList, errors, message }
    };
};

export default PartyUserService;