// pchips-v3/src/party/core/PartyUserService.ts

import { UserModel, PartyModel, PartyUserModel } from '../../../db/dbIndex';
import {
    TPartyUserListConditions, TPartyUserDelete, TPartyUserModel, TPartyUserService, TPartyUserUpdates, TUserPartyListConditions, TPartyUserData, TPartyModelList, TPartyDataList, TUserParties, TPartyMembers, TPartyService, PartyService, TPartyData, TPartyModel,
} from '../partyIndex';
import {
    addToResponseErrors, EErrorField, EErrorMessage, showLog, TErrorList,
} from '../../common/commonIndex';
import { TUserData, TUserDataList, TUserModel, TUserModelList, TUserService, UserService } from '../../auth/authIndex';

const file = 'PartyUserService';
const field = EErrorField.PARTY_USER;

class PartyUserService {
    private static async findPartyUser(partyId: number, userId: number): Promise<TPartyUserService> {
        const partyUserModel: TPartyUserModel = await PartyUserModel.findOne({ where: { partyId, userId }});
        const partyUserData: TPartyUserData = partyUserModel ? partyUserModel.toJSON() : null;

        return { partyUserModel, partyUserData };
    };

    private static validateFindResult(errors: TErrorList, findResult: TPartyUserService, partyId: number, userId: number, shouldExist: boolean): void {
        const { partyUserModel } = findResult;

        if (shouldExist && !partyUserModel) {
            addToResponseErrors(errors, field, EErrorMessage.NOT_FOUND);
            showLog(file, 'PartyUser not found', { partyId, userId }, false);
        } else if (!shouldExist && partyUserModel) {
            addToResponseErrors(errors, field, EErrorMessage.ALREADY_EXIST);
            showLog(file, 'PartyUser already exists', { partyId, userId }, false);
        };
    };

    public static async find(errors: TErrorList, partyId: number, userId: number, shouldExist: boolean): Promise<TPartyUserService> {
        const findResult = await this.findPartyUser(partyId, userId);
        this.validateFindResult(errors, findResult, partyId, userId, shouldExist);

        return findResult;
    };

    public static async create(errors: TErrorList, partyId: number, userId: number, isOwner: boolean = false): Promise<TPartyUserService> {
        let { partyUserModel, partyUserData } = await this.find(errors, partyId, userId, false);
        
        if (errors.length === 0) {
            partyUserModel = await PartyUserModel.create({ partyId, userId, isOwner });

            if (partyUserModel) {
                partyUserData = partyUserModel.toJSON();
                showLog(file, 'PartyUser successfully created', partyUserData, true);
            } else {
                showLog(file, 'Error creating PartyUser', { partyId, userId }, false);
                addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
            };
        };

        return { partyUserModel, partyUserData };
    };

    public static async get(errors: TErrorList, partyId: number, userId: number): Promise<TPartyUserService> {
        let { partyUserModel, partyUserData } = await this.find(errors, partyId, userId, true);
        
        if (errors.length === 0 && partyUserData) {
            showLog(file, 'PartyUser successfully retrieved', partyUserData, true);
        };

        return { partyUserModel, partyUserData };
    };

    public static async update(errors: TErrorList, partyId: number, userId: number, updates: TPartyUserUpdates): Promise<TPartyUserService> {
        const getPartyUserResult = await this.get(errors, partyId, userId);
        const { partyUserModel } = getPartyUserResult;
        let { partyUserData } = getPartyUserResult;

        if (errors.length === 0 && partyUserModel && partyUserData) {
            await partyUserModel.update(updates);
            partyUserData = partyUserModel.toJSON();
            showLog(file, 'PartyUser successfully updated', partyUserData, true);
        };

        return { partyUserModel, partyUserData };
    };

    public static async getUserParties(errors: TErrorList, conditions: TUserPartyListConditions): Promise<TUserParties> {
        const { userId } = conditions;
        let userModel: TUserModel = null;
        let userData: TUserData = null;
        let partyModelList: TPartyModelList = [];
        let partyDataList: TPartyDataList = [];
        
        let userResult: TUserService = { userModel, userData };
        if (userId) userResult = await UserService.getById(errors, userId);

        if (errors.length === 0 && userResult.userModel && userResult.userData) {
            const partyUserModelList = await PartyUserModel.findAll({
                where: conditions,
                include: [
                    { model: PartyModel, as: 'party', required: false },
                ],
            });

            partyModelList = partyUserModelList.map(pu => pu.dataValues.party);
            partyDataList = partyModelList.map(p => p.toJSON());
        };

        return { userModel, userData, partyModelList, partyDataList };
    };

    public static async getPartyMembers(errors: TErrorList, conditions: TPartyUserListConditions): Promise<TPartyMembers> {
        const { partyId } = conditions;
        let partyModel: TPartyModel = null;
        let partyData: TPartyData = null;
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];
        
        let partyResult: TPartyService = { partyModel, partyData };
        if (partyId) partyResult = await PartyService.get(errors, partyId);

        if (errors.length === 0 && partyResult.partyModel && partyResult.partyData) {
            const partyUserModelList = await PartyUserModel.findAll({
                where: conditions,
                include: [
                    { model: UserModel, as: 'user', required: false },
                ],
            });

            userModelList = partyUserModelList.map(pu => pu.dataValues.user);
            userDataList = userModelList.map(u => u.toJSON());
        };

        return { partyModel, partyData, userModelList, userDataList };
    };

    public static async delete(errors: TErrorList, partyId: number, userId: number): Promise<TPartyUserDelete> {
        const getPartyUserResult = await this.get(errors, partyId, userId);
        const { partyUserModel } = getPartyUserResult;
        let { partyUserData } = getPartyUserResult;
        let deleted = false;

        if (errors.length === 0 && partyUserModel && partyUserData) {
            await partyUserModel.destroy();
            deleted = true;
            showLog(file, 'PartyUser successfully deleted', partyUserData, true);
        };

        return { deleted };
    };
};

export default PartyUserService;