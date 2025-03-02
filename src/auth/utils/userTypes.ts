// pchips-v3/src/auth/utils/userTypes.ts

import { IUser, UserModel } from '../../../db/dbIndex';
import { TDeleteReturn } from '../../common/commonIndex';

export type TUserModelList = UserModel[];
export type TUserDataList = IUser[];

export type TUserModel = UserModel | null;
export type TUserData = IUser | null;

export type TUserUpdates = Partial<IUser> & { password?: string };
export type TUserFindData = Omit<Partial<IUser>, "password">;

export type TUserFindResult = {
    userById: TUserService,
    userByUsername: TUserService,
    userByEmail: TUserService,
};

export type TUserService = {
    userModel: TUserModel,
    userData: TUserData,
};

export type TUserList = {
    userModelList: TUserModelList,
    userDataList: TUserDataList,
};

export type TUserDelete = TDeleteReturn;