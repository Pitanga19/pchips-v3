// pchips-v3/src/utils/authUtils.ts

import { TAuthBody } from "./types/authTypes";
import { TUserUpdates } from "./types/userTypes";
import { EAuthProcess, EUserFind } from "./enums/authEnums";
import { RegExHandler } from "./stringsUtils";
import UserModel from "../../db/models/UserModel";
import { TErrorList } from "./types/errorTypes";
import { EErrorField, EErrorMessage } from "./enums/errorEnums";
import { addToResponseErrors } from "./errorUtils";

export const validateExistingInputs = (authProcess: EAuthProcess, errors: TErrorList, receivedBody: TAuthBody): void => {
    const id = receivedBody.id;
    const username = receivedBody.username;
    const email = receivedBody.email;
    const password = receivedBody.password;
    const repeatPassword = receivedBody.repeatPassword;
    const findedType = receivedBody.findedType;
    const findedValue = receivedBody.findedValue;
    const updates = receivedBody.updates;
    const message = EErrorMessage.DATA_IS_MISSING;
    let field: EErrorField;

    if (authProcess === EAuthProcess.REGISTER) {
        console.log('[authUtils] Register auth existing test');
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
        console.log('[authUtils] Login auth existing test');
        if (!username) {
            field = EErrorField.USERNAME;
            addToResponseErrors(errors, field, message);
        };
        if (!password) {
            field = EErrorField.PASSWORD;
            addToResponseErrors(errors, field, message);
        };
    };

    if (authProcess === EAuthProcess.RECOVERY) {
        console.log('[authUtils] Recover auth existing test');
        if (!findedType || findedType === EUserFind.NULL) {
            field = EErrorField.FINDED_TYPE;
            addToResponseErrors(errors, field, message);
        };
        if (!findedValue) {
            field = EErrorField.FINDED_VALUE;
            addToResponseErrors(errors, field, message);
        };
    };

    if (authProcess === EAuthProcess.MODIFY) {
        console.log('[authUtils] Recover auth existing test');
        if (!id) {
            field = EErrorField.USERNAME;
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

export const validateCorrectPassword = async (userModel: UserModel, errors: TErrorList, password: string): Promise<boolean> => {
    const field = EErrorField.PASSWORD;
    const message = EErrorMessage.WRONG_PASSWORD;
    const isValidPassword: boolean = await userModel.comparePassword(password);

    if (!isValidPassword) {
        console.log('[AuthService] Wrong password!\n');
        addToResponseErrors(errors, field, message);
    };

    return isValidPassword;
};

export const validatEUserFind = (errors: TErrorList, findedType: EUserFind | string): void => {
    const field = EErrorField.FINDED_TYPE;
    const message = EErrorMessage.INVALID_DATA;
    if (
        findedType === EUserFind.USERNAME ||
        findedType === EUserFind.EMAIL ||
        findedType === EUserFind.NULL
    ) {
        return;
    } else {
        addToResponseErrors(errors, field, message);
    };
};

export const validateExistingUpdates = (updates: TUserUpdates): void => {
    Object.keys(updates).forEach(key => {
        if (updates[key] === "") delete updates[key];
    });
};