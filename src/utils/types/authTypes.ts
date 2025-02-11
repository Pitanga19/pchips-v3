// pchips-v3/src/utils/types/authTypes.ts

import UserModel from "../../../db/models/UserModel";
import { EStatusHTTP, EAuthResponse, EInputField, EFindedType } from "../enums/authEnums";
import { IUser } from "../../../db/models/interfaces";

export type TErrorReturn = {
    field: EInputField,
    message: EAuthResponse,
};

export type TErrorsReturn = TErrorReturn[];

export type TUserServiceReturn = {
    status: EStatusHTTP,
    userModel: UserModel | null,
    errors: TErrorsReturn,
    message: EAuthResponse,
};

export type TUserDeleteReturn = {
    status: EStatusHTTP,
    value: boolean,
    errors: TErrorReturn[],
    message: EAuthResponse,
};

export type TUserUpdates = {
    username?: string;
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

export type TAuthServiceReturn = {
    status: EStatusHTTP,
    user: IUser | null,
    errors: TErrorReturn[],
    message: EAuthResponse,
};

export type TRegisterBody = {
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
};

export type TLoginBody = {
    username: string,
    password: string,
};

export type TRecoverBody = {
    findedType: EFindedType,
    findedValue: string,
};

export type TModifyBody = {
    id: number,
    password: string,
    updates: TUserUpdates,
    repeatPassword: string,
};

export type TAuthBody = {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    repeatPassword?: string,
    findedType?: EFindedType,
    findedValue?: string,
    updates?: TUserUpdates,
};