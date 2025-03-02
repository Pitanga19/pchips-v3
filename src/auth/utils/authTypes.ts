// pchips-v3/src/auth/utils/authTypes.ts

import { TUserUpdates, EUserFindType, TUserService } from '../authIndex';
import { TDeleteReturn } from '../../common/commonIndex';

export type TAuthService = TUserService;
export type TAuthDeleteService = TDeleteReturn;

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

export type TUpdateBody = {
    id: number,
    password: string,
    updates: TUserUpdates,
    repeatPassword: string,
};

export type TRecoverPasswordBody = {
    findedType: EUserFindType,
    findedValue: string,
};

export type TDeleteAccountBody = {
    id: number,
    password: string,
    safeword: string,
};

export type TAuthBody = Partial<TRegisterBody & TLoginBody & TUpdateBody & TRecoverPasswordBody & TDeleteAccountBody>;