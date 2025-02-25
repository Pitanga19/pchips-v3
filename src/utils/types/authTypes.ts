// pchips-v3/src/utils/types/authTypes.ts

import { EUserFind } from "../enums/authEnums";
import { EResponseMessage, EResponseStatus } from "../enums/statusEnums";
import { TUserUpdates } from "./userTypes";
import { IUser } from "../../../db/models/utils/interfaces";
import { TErrorList } from "./errorTypes";

export type TAuthServiceReturn = {
    status: EResponseStatus,
    user: IUser | null,
    errors: TErrorList,
    message: EResponseMessage,
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
    findedType: EUserFind,
    findedValue: string,
};

export type TUpdateBody = {
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
    findedType?: EUserFind,
    findedValue?: string,
    updates?: TUserUpdates,
};

