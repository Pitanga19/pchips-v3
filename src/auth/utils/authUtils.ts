// pchips-v3/src/auth/utils/authUtils.ts

import { TAuthBody, TUserUpdates, EAuthProcess, EUserFindType, ESafeword } from '../authIndex';
import {
    addToResponseErrors, RegExHandler, TErrorList, EErrorField, EErrorMessage, showLog,
} from '../../common/commonIndex';
import { UserModel } from '../../../db/dbIndex';

const file = 'authUtils';

export const validateCorrectPassword = async (errors: TErrorList, userModel: UserModel, password: string): Promise<boolean> => {
    const field = EErrorField.PASSWORD;
    const message = EErrorMessage.WRONG_PASSWORD;
    const isValidPassword: boolean = await userModel.comparePassword(password);

    if (!isValidPassword) {
        showLog(file, 'Wrong password', { userData: userModel.toJSON() }, false);
        addToResponseErrors(errors, field, message);
    };

    return isValidPassword;
};

export const validateCorrectSafeword = (errors: TErrorList, safeword: ESafeword, userSafeword: string): boolean => {
    let isCorrectSafeword = safeword === userSafeword;
    if (!isCorrectSafeword) {
        addToResponseErrors(errors, EErrorField.SAFEWORD, EErrorMessage.WRONG_SAFEWORD);
    };

    return isCorrectSafeword;
};

export const validateExistingInputs = (errors: TErrorList, authProcess: EAuthProcess, receivedBody: TAuthBody): void => {
    const {
        id, username, email, password, repeatPassword, updates, findedType, findedValue, safeword,
    } = receivedBody;

    const message = EErrorMessage.DATA_IS_MISSING;
    let field: EErrorField;

    if (authProcess === EAuthProcess.REGISTER) {
        console.log('[authUtils] Running register inputs existing test ...');
        if (!username) {
            field = EErrorField.USERNAME;
            addToResponseErrors(errors, field, message);
        };
        if (!email) {
            field = EErrorField.EMAIL;
            addToResponseErrors(errors, field, message);
        };
        if (!password) {
            field = EErrorField.PASSWORD;
            addToResponseErrors(errors, field, message);
        };
        if (!repeatPassword) {
            field = EErrorField.REPEAT_PASSWORD;
            addToResponseErrors(errors, field, message);
        };
    };

    if (authProcess === EAuthProcess.LOGIN) {
        console.log('[authUtils] Running login inputs existing test ...');
        if (!username) {
            field = EErrorField.USERNAME;
            addToResponseErrors(errors, field, message);
        };
        if (!password) {
            field = EErrorField.PASSWORD;
            addToResponseErrors(errors, field, message);
        };
    };

    if (authProcess === EAuthProcess.UPDATE) {
        console.log('[authUtils] Running update inputs existing test ...');
        if (!id) {
            field = EErrorField.ID;
            addToResponseErrors(errors, field, message);
        };
        if (!password) {
            field = EErrorField.PASSWORD;
            addToResponseErrors(errors, field, message);
        };
        if (!updates) {
            field = EErrorField.UPDATES;
            addToResponseErrors(errors, field, message);
        } else if (updates.password) {
            if (!repeatPassword) {
                field = EErrorField.REPEAT_PASSWORD;
                addToResponseErrors(errors, field, message);
            };
        };
    };

    if (authProcess === EAuthProcess.RECOVER_PASSWORD) {
        console.log('[authUtils] Running recover password inputs existing test ...');
        if (!findedType || findedType === EUserFindType.NULL) {
            field = EErrorField.FINDED_TYPE;
            addToResponseErrors(errors, field, message);
        };
        if (!findedValue) {
            field = EErrorField.FINDED_VALUE;
            addToResponseErrors(errors, field, message);
        };
    };

    if (authProcess === EAuthProcess.DELETE_ACCOUNT) {
        console.log('[authUtils] Running delete account inputs existing test ...');
        if (!id) {
            field = EErrorField.ID;
            addToResponseErrors(errors, field, message);
        };
        if (!password) {
            field = EErrorField.PASSWORD;
            addToResponseErrors(errors, field, message);
        };
        if (!safeword) {
            field = EErrorField.SAFEWORD;
            addToResponseErrors(errors, field, message);
        };
    };
};

export const validateUsername = (errors: TErrorList, username: string): void => {
    const field = EErrorField.USERNAME;
    let message: EErrorMessage;

    if (username.length < 4) {
        message = EErrorMessage.NOT_ENOUGH_CHARS;
        addToResponseErrors(errors, field, message);
    } else if (username.length > 20) {
        message = EErrorMessage.CHAR_EXCESS;
        addToResponseErrors(errors, field, message);
    } else if (!RegExHandler.isAlphanumeric(username)) {
        message = EErrorMessage.NOT_ALPHANUMERIC;
        addToResponseErrors(errors, field, message);
    };
};

export const validateEmail = (errors: TErrorList, email: string): void => {
    const field = EErrorField.EMAIL;
    let message: EErrorMessage;

    if (email.length > 320) {
        message = EErrorMessage.CHAR_EXCESS;
        addToResponseErrors(errors, field, message);
    } else if (!RegExHandler.isEmail(email)) {
        message = EErrorMessage.NOT_EMAIL_FORMAT;
        addToResponseErrors(errors, field, message);
    };
};

export const validatePassword = (errors: TErrorList, password: string): void => {
    const field = EErrorField.PASSWORD;
    let message: EErrorMessage;

    if (password.length < 8) {
        message = EErrorMessage.NOT_ENOUGH_CHARS;
        addToResponseErrors(errors, field, message);
    } else if (password.length > 64) {
        message = EErrorMessage.CHAR_EXCESS;
        addToResponseErrors(errors, field, message);
    };
};

export const validateRepeatPassword = (errors: TErrorList, password: string, repeatPassword: string): void => {
    const field = EErrorField.REPEAT_PASSWORD;
    const message = EErrorMessage.NOT_SAME_PASSWORD;

    if (password !== repeatPassword) {
        addToResponseErrors(errors, field, message);
    };
};

export const validateUserFindType = (errors: TErrorList, findedType: EUserFindType | string): void => {
    const field = EErrorField.FINDED_TYPE;
    const message = EErrorMessage.INVALID_DATA;
    if (
        findedType === EUserFindType.USERNAME ||
        findedType === EUserFindType.EMAIL ||
        findedType === EUserFindType.NULL
    ) {
        return;
    } else {
        addToResponseErrors(errors, field, message);
    };
};

export const validateExistingUpdates = (updates: TUserUpdates): void => {
    Object.keys(updates).forEach(key => {
        if (updates[key as keyof TUserUpdates] === '') delete updates[key as keyof TUserUpdates];
    });
};