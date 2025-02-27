import PartyUserService from "../services/PartyUserService";
import { EErrorField, EErrorMessage } from "./enums/errorEnums";
import { EResponseMessage, EResponseStatus } from "./enums/statusEnums";
import { addToResponseErrors } from "./errorUtils";
import { TErrorList } from "./types/errorTypes";
import { TPartyModelReturn, TPartyUserReturn, TUserPartyPermissions } from "./types/partyTypes";
import { TUserModelReturn } from "./types/userTypes";

export const validatePartyName = (errors: TErrorList, partyName: string): void => {
    const field = EErrorField.PARTY_NAME;
    let message: EErrorMessage;

    if (partyName.length < 3) {
        message = EErrorMessage.NOT_ENOUGH_CHARS;
        addToResponseErrors(errors, field, message);
    } else if (partyName.length > 32) {
        message = EErrorMessage.CHAR_EXCESS;
        addToResponseErrors(errors, field, message);
    };
};

export const checkPermissions = async (partyId: number, userId: number): Promise<TUserPartyPermissions> => {
    let isOwner: boolean = false;
    let isAdmin: boolean = false;

    const { partyUserModel } = await PartyUserService.get(partyId, userId);

    if (partyUserModel) {
        isOwner = partyUserModel.isOwner;
        isAdmin = partyUserModel.isAdmin;
    };

    return { isOwner, isAdmin };
};

export const validateDifferentUsers = (firstUserId: number, secondUserId: number, errors: TErrorList) => {
    let duStatusResult = null;
    let duMessageResult = null;

    if (firstUserId === secondUserId) {
        duStatusResult = EResponseStatus.CONFLICT;
        duMessageResult = EResponseMessage.CONFLICT;

        const actorField = EErrorField.PARTY_ACTOR;
        const actorMessage = EErrorMessage.SAME_USER;
        addToResponseErrors(errors, actorField, actorMessage);

        const targetField = EErrorField.PARTY_TARGET;
        const targetMessage = EErrorMessage.SAME_USER;
        addToResponseErrors(errors, targetField, targetMessage);
    };

    return { duStatusResult, duMessageResult };
};

export const validateExistingParty = (partyModel: TPartyModelReturn, errors: TErrorList) => {
    let epStatusResult = null;
    let epMessageResult = null;
    let epPartyResult = null;

    if (!partyModel) {
        epStatusResult = EResponseStatus.NOT_FOUND;
        epMessageResult = EResponseMessage.NOT_FOUND;
        const receivedField = EErrorField.PARTY;
        const receivedMessage = EErrorMessage.PARTY_NOT_FOUND;
        addToResponseErrors(errors, receivedField, receivedMessage);
    } else {
        epPartyResult = partyModel.toJSON();
    };

    return { epStatusResult, epMessageResult, epPartyResult };
};

export const validateIsOwnerOrAdmin = (isOwner: boolean, isAdmin: boolean, errors: TErrorList) => {
    let ooaStatusResult = null;
    let ooaMessageResult = null;

    if (!isOwner || !isAdmin) {
        ooaStatusResult = EResponseStatus.UNAUTHORIZED;
        ooaMessageResult = EResponseMessage.UNAUTHORIZED;
        const receivedField = EErrorField.PARTY_ACTOR;
        const receivedMessage = EErrorMessage.INSUFFICIENT_PERMISSIONS;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };

    return { ooaStatusResult, ooaMessageResult };
};

export const validateIsOwner = (isOwner: boolean, expected: boolean, errors: TErrorList) => {
    let isoStatusResult = null;
    let isoMessageResult = null;

    if (expected === true && !isOwner) {
        isoStatusResult = EResponseStatus.UNAUTHORIZED;
        isoMessageResult = EResponseMessage.UNAUTHORIZED;
        const receivedField = EErrorField.PARTY_ACTOR;
        const receivedMessage = EErrorMessage.INSUFFICIENT_PERMISSIONS;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };

    if (expected === false && isOwner) {
        isoStatusResult = EResponseStatus.UNAUTHORIZED;
        isoMessageResult = EResponseMessage.UNAUTHORIZED;
        const receivedField = EErrorField.PARTY_ACTOR;
        const receivedMessage = EErrorMessage.IS_OWNER;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };

    return { isoStatusResult, isoMessageResult };
};

export const validateExistingPartyUser = (partyUserModel: TPartyUserReturn, errors: TErrorList) => {
    let epuStatusResult = null;
    let epuMessageResult = null;

    if (partyUserModel) {
        epuStatusResult = EResponseStatus.CONFLICT;
        epuMessageResult = EResponseMessage.CONFLICT;
        const receivedField = EErrorField.PARTY_USER;
        const receivedMessage = EErrorMessage.EXISTING_PARTY_USER;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };

    return { epuStatusResult, epuMessageResult };
};

export const validateExistingUser = (userModel: TUserModelReturn, errors: TErrorList) => {
    let euStatusResult = null;
    let euMessageResult = null;
    let euUserResult = null;

    if (!userModel) {
        euStatusResult = EResponseStatus.CONFLICT;
        euMessageResult = EResponseMessage.CONFLICT;
        const receivedField = EErrorField.PARTY_USER;
        const receivedMessage = EErrorMessage.USER_NOT_FOUND;
        addToResponseErrors(errors, receivedField, receivedMessage);
    } else {
        euUserResult = userModel.toJSON();
    };

    return { euStatusResult, euMessageResult, euUserResult };
};