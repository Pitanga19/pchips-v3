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

export type TUserUpdates = Partial<Pick<UserModel, 'username' | 'email' | 'password'>>;

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

export type TAuthBody = {
    username?: string,
    email?: string,
    password?: string,
    repeatPassword?: string,
    findedType?: EFindedType,
    findedValue?: string,
};