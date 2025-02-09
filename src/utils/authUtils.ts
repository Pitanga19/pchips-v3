// pchips-v3/src/utils/authUtils.ts

import { TErrorsReturn, TErrorReturn, TAuthBody } from "./types/authTypes";
import { EAuthProcesses, EAuthResponse, EFindedType, EInputField } from "./enums/authEnums";
import { RegExHandler } from "./stringsUtils";
import UserModel from "../../db/models/UserModel";

export const addToValidateResult = (errors: TErrorsReturn, field: EInputField, message: EAuthResponse) => {
    const error: TErrorReturn = { field, message };
    errors.push(error);
};

export const validateExistingInputs = (authProcess: EAuthProcesses, errors: TErrorsReturn, receivedBody: TAuthBody): void => {
    const username = receivedBody.username;
    const email = receivedBody.email;
    const password = receivedBody.password;
    const repeatPassword = receivedBody.repeatPassword;
    const findedType = receivedBody.findedType;
    const findedValue = receivedBody.findedValue;
    const message = EAuthResponse.DATA_IS_MISSING;
    let field: EInputField;

    if (authProcess === EAuthProcesses.REGISTER) {
        console.log('[authUtils] Register auth existing test');
        if (!username) {
            field = EInputField.USERNAME;
            addToValidateResult(errors, field, message);
        };
        if (!email) {
            field = EInputField.EMAIL;
            addToValidateResult(errors, field, message);
        };
        if (!password) {
            field = EInputField.PASSWORD;
            addToValidateResult(errors, field, message);
        };
        if (!repeatPassword) {
            field = EInputField.REPEAT_PASSWORD;
            addToValidateResult(errors, field, message);
        };
    };

    if (authProcess === EAuthProcesses.LOGIN) {
        console.log('[authUtils] Login auth existing test');
        if (!username) {
            field = EInputField.USERNAME;
            addToValidateResult(errors, field, message);
        };
        if (!password) {
            field = EInputField.PASSWORD;
            addToValidateResult(errors, field, message);
        };
    };

    if (authProcess === EAuthProcesses.RECOVERY) {
        console.log('[authUtils] Recover auth existing test');
        if (!findedType || findedType === EFindedType.NULL) {
            field = EInputField.FINDED_TYPE;
            addToValidateResult(errors, field, message);
        };
        if (!findedValue) {
            field = EInputField.FINDED_VALUE;
            addToValidateResult(errors, field, message);
        };
    };
};

export const validateUsername = (errors: TErrorsReturn, username: string): void => {
    const field = EInputField.USERNAME;
    let message: EAuthResponse;

    if (username.length < 4) {
        message = EAuthResponse.NOT_ENOUGH_CHARS;
        addToValidateResult(errors, field, message);
    } else if (username.length > 20) {
        message = EAuthResponse.CHAR_EXCESS;
        addToValidateResult(errors, field, message);
    } else if (!RegExHandler.isAlphanumeric(username)) {
        message = EAuthResponse.NOT_ALPHANUMERIC;
        addToValidateResult(errors, field, message);
    };
};

export const validateEmail = (errors: TErrorsReturn, email: string): void => {
    const field = EInputField.EMAIL;
    let message: EAuthResponse;

    if (email.length > 320) {
        message = EAuthResponse.CHAR_EXCESS;
        addToValidateResult(errors, field, message);
    } else if (!RegExHandler.isEmail(email)) {
        message = EAuthResponse.NOT_EMAIL_FORMAT;
        addToValidateResult(errors, field, message);
    };
};

export const validatePassword = (errors: TErrorsReturn, password: string): void => {
    const field = EInputField.PASSWORD;
    let message: EAuthResponse;

    if (password.length < 8) {
        message = EAuthResponse.NOT_ENOUGH_CHARS;
        addToValidateResult(errors, field, message);
    } else if (password.length > 64) {
        message = EAuthResponse.CHAR_EXCESS;
        addToValidateResult(errors, field, message);
    };
};

export const validateRepeatPassword = (errors: TErrorsReturn, password: string, repeatPassword: string): void => {
    const field = EInputField.REPEAT_PASSWORD;
    const message = EAuthResponse.NOT_SAME_PASSWORD;

    if (password !== repeatPassword) {
        addToValidateResult(errors, field, message);
    };
};

export const validateCorrectPassword = async (userModel: UserModel, errors: TErrorsReturn, password: string): Promise<boolean> => {
    const field = EInputField.PASSWORD;
    const message = EAuthResponse.WRONG_PASSWORD;
    const isValidPassword: boolean = await userModel.comparePassword(password);

    if (!isValidPassword) {
        console.log('[AuthService] Wrong password!\n');
        addToValidateResult(errors, field, message);
    };

    return isValidPassword;
};

export const validateFindedType = (errors: TErrorsReturn, findedType: EFindedType | string): void => {
    const field = EInputField.FINDED_TYPE;
    const message = EAuthResponse.INVALID_DATA;
    if (
        findedType === EFindedType.USERNAME ||
        findedType === EFindedType.EMAIL ||
        findedType === EFindedType.NULL
    ) {
        return;
    } else {
        addToValidateResult(errors, field, message);
    };
};