// pchips-v3/src/auth/utils/userTypes.ts

import { EResponseStatus, EResponseMessage, TErrorList } from '../../common/commonIndex';
import { UserModel } from '../../../db/dbIndex';

export type TUserModelReturn = UserModel | null;

export type TUserServiceReturn = {
    status: EResponseStatus,
    userModel: TUserModelReturn,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TUserDeleteReturn = {
    status: EResponseStatus,
    value: boolean,
    errors: TErrorList,
    message: EResponseMessage,
};

export type TUserUpdates = {
    username?: string;
    email?: string;
    password?: string;
    [key: string]: string | undefined;
};