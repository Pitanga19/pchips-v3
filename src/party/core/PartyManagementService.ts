// pchips-v3/src/party/core/PartyManagementService.ts

import {
    PartyService, PartyUserService, validatePartyName, checkPermissions,validateDifferentUsers, validateExistingParty, validateIsOwnerOrAdmin, validateIsOwner, validateExistingPartyUser, validateExistingUser, TPartyReturn, TUserReturn, TPartyUserReturn, TPartyUserUpdates, TPartyList, TUserList, TPartyManagementReturn, TPartyUserDeleteManagementReturn, TUserPartyListReturn, TPartyUserListReturn,
} from '../partyIndex';
import { TErrorList, EResponseStatus, EResponseMessage } from '../../common/commonIndex';
import { UserService } from '../../auth/authIndex';

class PartyManagementService {
    public static async create(partyName: string, userId: number): Promise<TPartyManagementReturn> {
        const errors: TErrorList = [];
        let status = EResponseStatus.CREATED;
        let message = EResponseMessage.CREATED;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;

        validatePartyName(errors, partyName);

        if (errors.length === 0) {
            const { partyModel } = await PartyService.create(partyName);
            if (!partyModel) {
                console.log(`Error creating party: { party: ${partyName} - userId: ${userId} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                party = partyModel.toJSON();
                const partyId = party.id;
                
                const { partyUserModel } = await PartyUserService.create(partyId, userId, true);
                if (!partyUserModel) {
                    console.log(`Error user creating party-user: { partyId: ${partyId} - userId: ${userId} }`);
                    status = EResponseStatus.INTERNAL_SERVER_ERROR;
                    message = EResponseMessage.INTERNAL_SERVER_ERROR;
                } else {
                    partyUser = partyUserModel.toJSON();
                };
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async addUser(actorId: number, partyId: number, targetId: number): Promise<TPartyManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;

        const { duStatusResult, duMessageResult } = validateDifferentUsers(actorId, targetId, errors);
        if (duStatusResult !== null && duMessageResult !== null) {
            status = duStatusResult;
            message = duMessageResult;
        };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };
        
        const { partyUserModel } = await PartyUserService.get(partyId, targetId);
        const { epuStatusResult, epuMessageResult } = validateExistingPartyUser(partyUserModel, errors);
        if (epuStatusResult !== null && epuMessageResult !== null) {
            status = epuStatusResult;
            message = epuMessageResult;
        };

        const { isOwner, isAdmin } = await checkPermissions(partyId, actorId);
        const { ooaStatusResult, ooaMessageResult } = validateIsOwnerOrAdmin(isOwner, isAdmin, errors);
        if (ooaStatusResult !== null && ooaMessageResult !== null) {
            status = ooaStatusResult;
            message = ooaMessageResult;
        };

        if (errors.length === 0) {
            const { partyUserModel } = await PartyUserService.create(partyId, targetId);

            if (!partyUserModel) {
                console.log(`Error adding user to party: { partyId: ${partyId} - userId: ${targetId} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                partyUser = partyUserModel.toJSON();
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async removeUser(actorId: number, partyId: number, targetId: number): Promise<TPartyUserDeleteManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let value: boolean = false;

        const { duStatusResult, duMessageResult } = validateDifferentUsers(actorId, targetId, errors);
        if (duStatusResult !== null && duMessageResult !== null) {
            status = duStatusResult;
            message = duMessageResult;
        };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        const { isOwner, isAdmin } = await checkPermissions(partyId, actorId);
        const { ooaStatusResult, ooaMessageResult } = validateIsOwnerOrAdmin(isOwner, isAdmin, errors);
        if (ooaStatusResult !== null && ooaMessageResult !== null) {
            status = ooaStatusResult;
            message = ooaMessageResult;
        };

        if (errors.length === 0) {
            const deletePartyUserResult = await PartyUserService.delete(partyId, targetId);
            status = deletePartyUserResult.status;
            value = deletePartyUserResult.value;
            message = deletePartyUserResult.message;
            errors.push(...deletePartyUserResult.errors);
        };

        return { status, party, value, errors, message };
    };

    public static async leave(actorId: number, partyId: number): Promise<TPartyUserDeleteManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let value: boolean = false;
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        const { isOwner } = await checkPermissions(partyId, actorId);
        const { isoStatusResult, isoMessageResult } = validateIsOwner(isOwner, false, errors);
        if (isoStatusResult !== null && isoMessageResult !== null) {
            status = isoStatusResult;
            message = isoMessageResult;
        };

        if (errors.length === 0) {
            const deletePartyUserResult = await PartyUserService.delete(partyId, actorId);
            status = deletePartyUserResult.status;
            value = deletePartyUserResult.value;
            message = deletePartyUserResult.message;
            errors.push(...deletePartyUserResult.errors);
        };

        return { status, party, value, errors, message };
    };

    public static async assignAdmin(actorId: number, partyId: number, targetId: number): Promise<TPartyManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;
        const updates: TPartyUserUpdates = { isAdmin: true };

        const { duStatusResult, duMessageResult } = validateDifferentUsers(actorId, targetId, errors);
        if (duStatusResult !== null && duMessageResult !== null) {
            status = duStatusResult;
            message = duMessageResult;
        };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        const { isOwner } = await checkPermissions(partyId, actorId);
        const { isoStatusResult, isoMessageResult } = validateIsOwner(isOwner, true, errors);
        if (isoStatusResult !== null && isoMessageResult !== null) {
            status = isoStatusResult;
            message = isoMessageResult;
        };

        if (errors.length === 0) {
            const { partyUserModel } = await PartyUserService.update(partyId, targetId, updates);

            if (!partyUserModel) {
                console.log(`Error assigning admin: { partyId: ${partyId} - userId: ${targetId} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                partyUser = partyUserModel.toJSON();
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async removeAdmin(actorId: number, partyId: number, targetId: number): Promise<TPartyManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;
        const updates: TPartyUserUpdates = { isAdmin: false };

        const { duStatusResult, duMessageResult } = validateDifferentUsers(actorId, targetId, errors);
        if (duStatusResult !== null && duMessageResult !== null) {
            status = duStatusResult;
            message = duMessageResult;
        };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        const { isOwner } = await checkPermissions(partyId, actorId);
        const { isoStatusResult, isoMessageResult } = validateIsOwner(isOwner, true, errors);
        if (isoStatusResult !== null && isoMessageResult !== null) {
            status = isoStatusResult;
            message = isoMessageResult;
        };

        if (errors.length === 0) {
            const { partyUserModel } = await PartyUserService.update(partyId, targetId, updates);

            if (!partyUserModel) {
                console.log(`Error assigning admin: { partyId: ${partyId} - userId: ${targetId} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                partyUser = partyUserModel.toJSON();
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async transferOwner(actorId: number, partyId: number, targetId: number): Promise<TPartyManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;
        const updateMakeOwner: TPartyUserUpdates = { isOwner: true };
        const updateRemoveOwner: TPartyUserUpdates = { isOwner: false };

        const { duStatusResult, duMessageResult } = validateDifferentUsers(actorId, targetId, errors);
        if (duStatusResult !== null && duMessageResult !== null) {
            status = duStatusResult;
            message = duMessageResult;
        };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        const { isOwner } = await checkPermissions(partyId, actorId);
        const { isoStatusResult, isoMessageResult } = validateIsOwner(isOwner, true, errors);
        if (isoStatusResult !== null && isoMessageResult !== null) {
            status = isoStatusResult;
            message = isoMessageResult;
        };

        if (errors.length === 0) {
            const addOwnerResult = await PartyUserService.update(partyId, targetId, updateMakeOwner);
            const removeOwnerResult = await PartyUserService.update(partyId, actorId, updateRemoveOwner);

            if (!addOwnerResult.partyUserModel || !removeOwnerResult.partyUserModel) {
                console.log(`Error transfering owner: { partyId: ${partyId} - userId: ${targetId} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                partyUser = addOwnerResult.partyUserModel.toJSON();
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async rename(actorId: number, partyId: number, newName: string): Promise<TPartyManagementReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let partyUser: TPartyUserReturn = null;
        
        const { epStatusResult, epMessageResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        };

        const { partyUserModel } = await PartyUserService.get(partyId, actorId);
        const { epuStatusResult, epuMessageResult } = validateExistingPartyUser(partyUserModel, errors);
        if (epuStatusResult !== null && epuMessageResult !== null) {
            status = epuStatusResult;
            message = epuMessageResult;
        } else if (partyUserModel) {
            partyUser = partyUserModel.toJSON();
            const { isOwner, isAdmin } = partyUserModel;
            const { ooaStatusResult, ooaMessageResult } = validateIsOwnerOrAdmin(isOwner, isAdmin, errors);
            if (ooaStatusResult !== null && ooaMessageResult !== null) {
                status = ooaStatusResult;
                message = ooaMessageResult;
            };
        };

        if (errors.length === 0) {
            if (!partyModel) {
                console.log(`Error renaming party: { partyId: ${partyId} - newName: ${newName} }`);
                status = EResponseStatus.INTERNAL_SERVER_ERROR;
                message = EResponseMessage.INTERNAL_SERVER_ERROR;
            } else {
                await partyModel.update({ name: newName });
                party = partyModel.toJSON();
            };
        };

        return { status, party, partyUser, errors, message };
    };

    public static async getUserAllParties(userId: number): Promise<TUserPartyListReturn> {
        const getUserResult = await UserService.getById(userId);
        const { errors } = getUserResult;
        let { status, userModel, message } = getUserResult;
        let user: TUserReturn = null;
        let partyList: TPartyList = [];
        const conditions = { userId };

        const { euStatusResult, euMessageResult, euUserResult } = validateExistingUser(userModel, errors);
        if (euStatusResult !== null && euMessageResult !== null) {
            status = euStatusResult;
            message = euMessageResult;
        } else {
            user = euUserResult;
        };

        if (errors.length === 0) {
            const { partyModelList } = await PartyUserService.getUserParties(conditions);
            partyList = partyModelList.map(p => p.toJSON());
        };

        return { status, user, partyList, errors, message };
    };

    public static async getUserAdminParties(userId: number): Promise<TUserPartyListReturn> {
        const getUserResult = await UserService.getById(userId);
        const { errors } = getUserResult;
        let { status, userModel, message } = getUserResult;
        let user: TUserReturn = null;
        let partyList: TPartyList = [];
        const conditions = { userId, isAdmin: true };

        const { euStatusResult, euMessageResult, euUserResult } = validateExistingUser(userModel, errors);
        if (euStatusResult !== null && euMessageResult !== null) {
            status = euStatusResult;
            message = euMessageResult;
        } else {
            user = euUserResult;
        };

        if (errors.length === 0) {
            const { partyModelList } = await PartyUserService.getUserParties(conditions);
            partyList = partyModelList.map(p => p.toJSON());
        };

        return { status, user, partyList, errors, message };
    };

    public static async getUserOwnerParties(userId: number): Promise<TUserPartyListReturn> {
        const getUserResult = await UserService.getById(userId);
        const { errors } = getUserResult;
        let { status, userModel, message } = getUserResult;
        let user: TUserReturn = null;
        let partyList: TPartyList = [];
        const conditions = { userId, isOwner: true };

        const { euStatusResult, euMessageResult, euUserResult } = validateExistingUser(userModel, errors);
        if (euStatusResult !== null && euMessageResult !== null) {
            status = euStatusResult;
            message = euMessageResult;
        } else {
            user = euUserResult;
        };

        if (errors.length === 0) {
            const { partyModelList } = await PartyUserService.getUserParties(conditions);
            partyList = partyModelList.map(p => p.toJSON());
        };

        return { status, user, partyList, errors, message };
    };

    public static async getPartyMembers(partyId: number): Promise<TPartyUserListReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let userList: TUserList = [];
        const conditions = { partyId };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        if (errors.length === 0) {
            const { userModelList } = await PartyUserService.getPartyUsers(conditions);
            userList = userModelList.map(u => u.toJSON());
        };

        return { status, party, userList, errors, message };
    };

    public static async getPartyAdmins(partyId: number): Promise<TPartyUserListReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let userList: TUserList = [];
        const conditions = { partyId, isAdmin: true };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        if (errors.length === 0) {
            const { userModelList } = await PartyUserService.getPartyUsers(conditions);
            userList = userModelList.map(u => u.toJSON());
        };

        return { status, party, userList, errors, message };
    };

    public static async getPartyOwners(partyId: number): Promise<TPartyUserListReturn> {
        const getPartyResult = await PartyService.get(partyId);
        const { errors } = getPartyResult;
        let { status, partyModel, message } = getPartyResult;
        let party: TPartyReturn = null;
        let userList: TUserList = [];
        const conditions = { partyId, isOwner: true };
        
        const { epStatusResult, epMessageResult, epPartyResult } = validateExistingParty(partyModel, errors);
        if (epStatusResult !== null && epMessageResult !== null) {
            status = epStatusResult;
            message = epMessageResult;
        } else {
            party = epPartyResult;
        };

        if (errors.length === 0) {
            const { userModelList } = await PartyUserService.getPartyUsers(conditions);
            userList = userModelList.map(u => u.toJSON());
        };

        return { status, party, userList, errors, message };
    };
};

export default PartyManagementService;