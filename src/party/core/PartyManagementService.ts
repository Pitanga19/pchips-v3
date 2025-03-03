// pchips-v3/src/party/core/PartyManagementService.ts

import {
    PartyService, PartyUserService, validatePartyName, validateIsOwnerOrAdmin, validateIsOwner, TPartyUserUpdates, TPartyManagement, TPartyModel, TPartyData, TPartyUserModel, TPartyUserData, TPartyManageTarget, TPartyManageDelete, TPartyManagementFindData, TPartyManageLeave, TUserParties, TPartyModelList, TPartyDataList, TPartyMembers, EPartyManagementFindType,
    TPartyUpdates,
} from '../partyIndex';
import { TErrorList, addToResponseErrors, EErrorField, EErrorMessage } from '../../common/commonIndex';
import { TUserData, TUserDataList, TUserModel, TUserModelList, UserService } from '../../auth/authIndex';

class PartyManagementService {
    private static async find(errors: TErrorList, data: TPartyManagementFindData, findType: EPartyManagementFindType, shouldExistPartyTarget: boolean = false) {
        const { actorId, targetId, partyId } = data;

        let actorModel: TUserModel = null;
        let actorData: TUserData = null;
        let targetModel: TUserModel = null;
        let targetData: TUserData = null;
        let partyModel: TPartyModel = null;
        let partyData: TPartyData = null;
        let partyActorModel: TPartyUserModel = null;
        let partyActorData: TPartyUserData = null;
        let partyTargetModel: TPartyUserModel = null;
        let partyTargetData: TPartyUserData = null;

        if (actorId) {
            const getActorResult = await UserService.getById(errors, actorId);
            actorModel = getActorResult.userModel;
            actorData = getActorResult.userData;
        };

        if (findType === EPartyManagementFindType.FIND_PARTY || findType === EPartyManagementFindType.FIND_TARGET) {
            if (partyId) {
                const getPartyResult = await PartyService.get(errors, partyId);
                partyModel = getPartyResult.partyModel;
                partyData = getPartyResult.partyData;
            };
    
            if (actorId && partyId && actorModel && partyModel) {
                const getPartyActorResult = await PartyUserService.get(errors, partyId, actorId);
                partyActorData = getPartyActorResult.partyUserData;
                partyActorModel = getPartyActorResult.partyUserModel;
            };
        };

        if (findType === EPartyManagementFindType.FIND_TARGET) {
            if (targetId) {
                const getTargetResult = await UserService.getById(errors, targetId);
                targetModel = getTargetResult.userModel;
                targetData = getTargetResult.userData;
            };
    
            if (targetId && partyId && targetModel && partyModel && shouldExistPartyTarget) {
                const getPartyTargetResult = await PartyUserService.get(errors, partyId, targetId);
                partyTargetData = getPartyTargetResult.partyUserData;
                partyTargetModel = getPartyTargetResult.partyUserModel;
            };
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetData, partyTargetModel };
    };

    public static async create(errors: TErrorList, actorId: number, partyName: string): Promise<TPartyManagement> {
        const findData = { actorId };
        let partyModel: TPartyModel = null;
        let partyData: TPartyData = null;
        let partyActorModel: TPartyUserModel = null;
        let partyActorData: TPartyUserData = null;

        validatePartyName(errors, partyName);
        const { actorModel, actorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_ACTOR);

        if (errors.length === 0 && actorModel) {
            const createPartyResult = await PartyService.create(errors, partyName);
            partyModel = createPartyResult.partyModel;
            partyData = createPartyResult.partyData;
        };

        if (errors.length === 0 && partyModel && actorModel) {
            const createPartyUserResult = await PartyUserService.create(errors, partyModel.id, actorModel.id, true);
            partyActorModel = createPartyUserResult.partyUserModel;
            partyActorData = createPartyUserResult.partyUserData;
        };

        return { actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData };
    };

    public static async addUser(errors: TErrorList, actorId: number, partyId: number, targetId: number): Promise<TPartyManageTarget> {
        const findData = { actorId, partyId, targetId };
        let partyTargetModel: TPartyUserModel = null;
        let partyTargetData: TPartyUserData = null;

        const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, partyActorData);
        };

        if (errors.length === 0) {
            const createPartyTargetResult = await PartyUserService.create(errors, partyId, targetId);
            partyTargetModel = createPartyTargetResult.partyUserModel;
            partyTargetData = createPartyTargetResult.partyUserData;
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData };
    };

    public static async removeUser(errors: TErrorList, actorId: number, partyId: number, targetId: number): Promise<TPartyManageDelete> {
        const findData = { actorId, partyId, targetId };
        let deleted: boolean = false;

        const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET, true);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, partyActorData);
        };

        if (errors.length === 0) {
            const deleteTargetResult = await PartyUserService.delete(errors, partyId, targetId);
            deleted = deleteTargetResult.deleted;
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, deleted };
    };

    public static async leave(errors: TErrorList, actorId: number, partyId: number): Promise<TPartyManageLeave> {
        const findData = { actorId, partyId };
        let deleted: boolean = false;

        const { actorModel, actorData, partyModel, partyData, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, partyActorData, false);
        };

        if (errors.length === 0) {
            const deleteActorResult = await PartyUserService.delete(errors, partyId, actorId);
            deleted = deleteActorResult.deleted;
        };

        return { actorModel, actorData, partyModel, partyData, deleted };
    };

    public static async assignAdmin(errors: TErrorList, actorId: number, partyId: number, targetId: number): Promise<TPartyManageTarget> {
        const findData = { actorId, partyId, targetId };
        let partyTargetModel: TPartyUserModel = null;
        let partyTargetData: TPartyUserData = null;

        const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET, true);
        const updates: TPartyUserUpdates = { isAdmin: true };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, partyActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await PartyUserService.update(errors, partyId, targetId, updates);
            partyTargetModel = updateTargetResult.partyUserModel;
            partyTargetData = updateTargetResult.partyUserData;
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData };
    };

    public static async removeAdmin(errors: TErrorList, actorId: number, partyId: number, targetId: number): Promise<TPartyManageTarget> {
        const findData = { actorId, partyId, targetId };
        let partyTargetModel: TPartyUserModel = null;
        let partyTargetData: TPartyUserData = null;

        const { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET, true);
        const updates: TPartyUserUpdates = { isAdmin: false };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, partyActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await PartyUserService.update(errors, partyId, targetId, updates);
            partyTargetModel = updateTargetResult.partyUserModel;
            partyTargetData = updateTargetResult.partyUserData;
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData };
    };

    public static async transferOwner(errors: TErrorList, actorId: number, partyId: number, targetId: number): Promise<TPartyManageTarget> {
        const findData = { actorId, partyId, targetId };

        const findResult = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET, true);
        const { actorModel, actorData, targetModel, targetData, partyModel, partyData } = findResult;
        let { partyActorModel, partyActorData, partyTargetModel, partyTargetData } = findResult;

        const updatesMakeOwner: TPartyUserUpdates = { isOwner: true };
        const updatesRemoveOwner: TPartyUserUpdates = { isOwner: false };

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!targetModel) addToResponseErrors(errors, EErrorField.TARGET, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwner(errors, partyActorData, true);
        };

        if (errors.length === 0) {
            const updateTargetResult = await PartyUserService.update(errors, partyId, targetId, updatesMakeOwner);
            partyTargetModel = updateTargetResult.partyUserModel;
            partyTargetData = updateTargetResult.partyUserData;
            const updateActorResult = await PartyUserService.update(errors, partyId, actorId, updatesRemoveOwner);
            partyActorModel = updateActorResult.partyUserModel;
            partyActorData = updateActorResult.partyUserData;
        };

        return { actorModel, actorData, targetModel, targetData, partyModel, partyData, partyActorModel, partyActorData, partyTargetModel, partyTargetData };
    };

    public static async update(errors: TErrorList, actorId: number, partyId: number, updates: TPartyUpdates): Promise<TPartyManagement> {
        const findData = { actorId, partyId };
        let partyData: TPartyData = null;

        const { actorModel, actorData, partyModel, partyActorModel, partyActorData } = await this.find(errors, findData, EPartyManagementFindType.FIND_TARGET);

        if (!actorModel) addToResponseErrors(errors, EErrorField.ACTOR, EErrorMessage.NOT_FOUND);
        if (!partyModel) addToResponseErrors(errors, EErrorField.PARTY, EErrorMessage.NOT_FOUND);

        if (!partyActorData) {
            addToResponseErrors(errors, EErrorField.PARTY_ACTOR, EErrorMessage.NOT_FOUND);
        } else {
            validateIsOwnerOrAdmin(errors, partyActorData);
        };

        if (errors.length === 0 && partyModel) {
            await partyModel.update(updates);
            partyData = partyModel.toJSON();
        };

        return { actorModel, actorData, partyModel, partyData, partyActorModel, partyActorData };
    };

    public static async getUserAllParties(errors: TErrorList, userId: number): Promise<TUserParties> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId };
        let partyModelList: TPartyModelList = [];
        let partyDataList: TPartyDataList = [];

        if (errors.length === 0) {
            const getPartiesResult = await PartyUserService.getUserParties(errors, conditions);
            partyModelList = getPartiesResult.partyModelList;
            partyDataList = getPartiesResult.partyDataList;
        };

        return { userModel, userData, partyModelList, partyDataList };
    };

    public static async getUserAdminParties(errors: TErrorList, userId: number): Promise<TUserParties> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId, isAdmin: true };
        let partyModelList: TPartyModelList = [];
        let partyDataList: TPartyDataList = [];

        if (errors.length === 0) {
            const getPartiesResult = await PartyUserService.getUserParties(errors, conditions);
            partyModelList = getPartiesResult.partyModelList;
            partyDataList = getPartiesResult.partyDataList;
        };

        return { userModel, userData, partyModelList, partyDataList };
    };

    public static async getUserOwnerParties(errors: TErrorList, userId: number): Promise<TUserParties> {
        const { userModel, userData } = await UserService.getById(errors, userId);
        const conditions = { userId, isOwner: true };
        let partyModelList: TPartyModelList = [];
        let partyDataList: TPartyDataList = [];

        if (errors.length === 0) {
            const getPartiesResult = await PartyUserService.getUserParties(errors, conditions);
            partyModelList = getPartiesResult.partyModelList;
            partyDataList = getPartiesResult.partyDataList;
        };

        return { userModel, userData, partyModelList, partyDataList };
    };

    public static async getPartyMembers(errors: TErrorList, partyId: number): Promise<TPartyMembers> {
        const { partyModel, partyData } = await PartyService.get(errors, partyId);
        const conditions = { partyId };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await PartyUserService.getPartyMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { partyModel, partyData, userModelList, userDataList };
    };

    public static async getPartyAdmins(errors: TErrorList, partyId: number): Promise<TPartyMembers> {
        const { partyModel, partyData } = await PartyService.get(errors, partyId);
        const conditions = { partyId, isAdmin: true };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await PartyUserService.getPartyMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { partyModel, partyData, userModelList, userDataList };
    };

    public static async getPartyOwners(errors: TErrorList, partyId: number): Promise<TPartyMembers> {
        const { partyModel, partyData } = await PartyService.get(errors, partyId);
        const conditions = { partyId, isOwner: true };
        let userModelList: TUserModelList = [];
        let userDataList: TUserDataList = [];

        if (errors.length === 0) {
            const getMembersResult = await PartyUserService.getPartyMembers(errors, conditions);
            userModelList = getMembersResult.userModelList;
            userDataList = getMembersResult.userDataList;
        };

        return { partyModel, partyData, userModelList, userDataList };
    };
};

export default PartyManagementService;