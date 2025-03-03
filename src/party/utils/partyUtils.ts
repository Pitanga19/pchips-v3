// pchips-v3/src/party/utils/partyUtils.ts

import { TUserPartyPermissions } from '../partyIndex';
import { addToResponseErrors, TErrorList, EErrorField, EErrorMessage } from '../../common/commonIndex';
import { IPartyUser } from '../../../db/dbIndex';

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

export const validateDifferentUsers = (errors: TErrorList, firstUserId: number, secondUserId: number): void => {
    if (firstUserId === secondUserId) {
        const actorField = EErrorField.PARTY_ACTOR;
        const actorMessage = EErrorMessage.SAME_USER;
        addToResponseErrors(errors, actorField, actorMessage);

        const targetField = EErrorField.PARTY_TARGET;
        const targetMessage = EErrorMessage.SAME_USER;
        addToResponseErrors(errors, targetField, targetMessage);
    };
};

export const validateIsOwnerOrAdmin = (errors: TErrorList, data: IPartyUser): void => {
    const { isOwner, isAdmin } = data;

    if (!(isOwner || isAdmin)) {
        const receivedField = EErrorField.PARTY_ACTOR;
        const receivedMessage = EErrorMessage.INSUFFICIENT_PERMISSIONS;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };
};

export const validateIsOwner = (errors: TErrorList, data: Partial<IPartyUser>, expected: boolean): void => {
    const { isOwner } = data;

    if (expected === true && !isOwner) {
        const receivedField = EErrorField.PARTY_ACTOR;
        const receivedMessage = EErrorMessage.INSUFFICIENT_PERMISSIONS;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };

    if (expected === false && isOwner) {
        const receivedField = EErrorField.ACTOR;
        const receivedMessage = EErrorMessage.IS_OWNER;
        addToResponseErrors(errors, receivedField, receivedMessage);
    };
};