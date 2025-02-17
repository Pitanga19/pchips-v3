// pchips-v3/src/utils/types/userTypes.ts

import { EResponseStatus, EResponseMessage } from '../enums/statusEnums';
import UserModel from '../../../db/models/UserModel';
import { TErrorList } from './errorTypes';

export type TUserServiceReturn = {
    status: EResponseStatus,
    userModel: UserModel | null,
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