// pchips-v3/src/auth/utils/authTypes.ts

import { TUserUpdates, EUserFind } from '../authIndex';
import { TErrorList, EResponseMessage, EResponseStatus } from '../../common/commonIndex';
import { IUser } from '../../../db/dbIndex';

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

