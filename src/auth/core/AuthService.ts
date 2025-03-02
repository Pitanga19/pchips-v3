// pchips-v3/src/auth/core/AuthService.ts

import { UserService, validateCorrectPassword, EUserFindType, TAuthService, TUserService, TUserUpdates, TAuthDeleteService } from '../authIndex';
import { EErrorField, EErrorMessage, TErrorList, showLog, addToResponseErrors } from '../../common/commonIndex';

const file = 'AuthService'

class AuthService {
    public static async register(errors: TErrorList, username: string, email: string, password: string): Promise<TAuthService> {
        const { userModel, userData } = await UserService.create(errors, username, email, password);

        if (errors.length === 0) {
            showLog(file, 'User successfully registered', { username, email, password }, true);
        } else {
            showLog(file, 'Error registering user', { username, email, password }, false);
        };
        
        return { userModel, userData };
    };

    public static async login(errors: TErrorList, username: string, password: string): Promise<TAuthService> {
        let { userModel, userData } = await UserService.getByUsername(errors, username);

        if (userModel) {
            const isCorrectPassword = await validateCorrectPassword(errors, userModel, password);
            if (!isCorrectPassword) {
                userModel = null;
                userData = null;
            };
        };

        if (errors.length === 0) {
            showLog(file, 'User successfully logged in', { username }, true);
        } else {
            showLog(file, 'Error logging in user', { username }, false);
        };

        return { userModel, userData };
    };

    public static async update(errors: TErrorList, id: number, password: string, updates: TUserUpdates): Promise<TAuthService> {
        const updateUserResult = await UserService.update(errors, id, password, updates);

        if (errors.length === 0) {
            showLog(file, 'User successfully updated', updates, true);
        } else {
            showLog(file, 'Error updating user', { id }, false);
        };

        return updateUserResult;
    };

    public static async recoverPassword(errors: TErrorList, findedType: EUserFindType, findedData: string): Promise<TAuthService> {
        let getUserResult: TUserService = { userModel: null, userData: null };
        const field = EErrorField.FINDED_TYPE;

        if (findedType === EUserFindType.USERNAME) {
            getUserResult = await UserService.getByUsername(errors, findedData);
        } else if (findedType === EUserFindType.EMAIL) {
            getUserResult = await UserService.getByEmail(errors, findedData);
        } else if (findedType === EUserFindType.NULL) {
            addToResponseErrors(errors, field, EErrorMessage.DATA_IS_MISSING);
        } else {
            addToResponseErrors(errors, field, EErrorMessage.INTERNAL_SERVER_ERROR);
        };

        if (errors.length === 0) {
            showLog(file, 'Email successfully sent to recover password', { findedType, findedData }, true);
        } else {
            showLog(file, 'Error recovering password', { findedType, findedData }, false);
        };

        return getUserResult;
    };

    public static async deleteAccount(errors: TErrorList, id: number, password: string, safeword: string): Promise<TAuthDeleteService> {
        const deleteUserResult = await UserService.delete(errors, id, password, safeword);

        if (errors.length === 0) {
            showLog(file, 'User successfully deleted', { id }, true);
        } else {
            showLog(file, 'Error deleting user', { id }, false);
        };

        return deleteUserResult
    };
};

export default AuthService;