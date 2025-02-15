// pchips-v3/src/services/AuthService.ts

import { IUser } from "../../db/models/interfaces";
import UserModel from "../../db/models/UserModel";
import { validateCorrectPassword } from "../utils/authUtils";
import { EAuthResponse, EFindedType, EInputField, EStatusHTTP } from "../utils/enums/authEnums";
import { TAuthServiceReturn, TUserServiceReturn, TUserUpdates } from "../utils/types/authTypes";
import UserService from "./UserService";

class AuthService {
    public static async register(username: string, email: string, password: string): Promise<TAuthServiceReturn> {
        const createUserResult = await UserService.create(username, email, password);
        if (!createUserResult.userModel) {
            console.log(`[AuthService] Error creating user: ${username}\n`);
                return {
                    status: createUserResult.status,
                    user: createUserResult.userModel,
                    errors: createUserResult.errors,
                    message: createUserResult.message,
                };
        };

        console.log(`[AuthService] User successfully start to register: ${username}\n`);
            return {
                status: createUserResult.status,
                user: createUserResult.userModel.toJSON(),
                errors: createUserResult.errors,
                message: createUserResult.message,
            };
    };

    public static async login(username: string, password: string): Promise<TAuthServiceReturn> {
        const getUserResult = await UserService.getByUsername(username);
        const status = getUserResult.status;
        const errors = getUserResult.errors;
        const message = getUserResult.message;
        let user = null;

        if (!getUserResult.userModel) {
            console.log(`[AuthService] User not found: ${username}\n`);
            return { status, user, errors, message };
        };

        const userModel = getUserResult.userModel;
        const isCorrectPassword = await validateCorrectPassword(userModel, errors, password);
        if (!isCorrectPassword) {
            console.log(`[AuthService] Wrong password: ${username}\n`);
            return { status, user, errors, message };
        };
        
        user = userModel.toJSON();
        console.log(`[AuthService] User successfully logged in: ${username}\n`);
        return {
            status: getUserResult.status,
            user,
            errors: getUserResult.errors,
            message: getUserResult.message,
        };
    };

    public static async recover(findedType: EFindedType, findedData: string): Promise<TAuthServiceReturn> {
        let getUserResult: TUserServiceReturn;
        let user: IUser | null = null;
        if (findedType === EFindedType.USERNAME) {
            getUserResult = await UserService.getByUsername(findedData);
        } else if (findedType === EFindedType.EMAIL) {
            getUserResult = await UserService.getByEmail(findedData);
        } else if (findedType === EFindedType.NULL) {
            const error = { field: EInputField.FINDED_TYPE, message: EAuthResponse.DATA_IS_MISSING };
            return {
                user: null,
                status: EStatusHTTP.BAD_REQUEST,
                errors: [error],
                message: EAuthResponse.INVALID_DATA,
            };
        } else {
            return {
                user: null,
                status: EStatusHTTP.INTERNAL_SERVER_ERROR,
                errors: [],
                message: EAuthResponse.INTERNAL_SERVER_ERROR,
            };
        };

        if (!getUserResult.userModel) {
            console.log(`[AuthService] User not found: ${findedData}\n`);
        };

        if (getUserResult.userModel !== null) {
            user = getUserResult.userModel.toJSON(); 
        };

        console.log(`[AuthService] User successfully start to recover password: ${findedData}\n`);
        return {
            status: getUserResult.status,
            user,
            errors: getUserResult.errors,
            message: getUserResult.message,
        };
    };

    public static async modify(id: number, password: string, updates: TUserUpdates): Promise<TAuthServiceReturn> {
        const getUserResult = await UserService.getById(id);
        let status = getUserResult.status;
        let errors = getUserResult.errors;
        let message = getUserResult.message;
        let userModel: UserModel | null = null;
        let user = null;

        if (!getUserResult.userModel) {
            console.log(`[AuthService] User not found: ${id}\n`);
            return { status, user, errors, message };
        };

        userModel = getUserResult.userModel;
        const isCorrectPassword = await validateCorrectPassword(userModel, errors, password);
        if (!isCorrectPassword) {
            console.log(`[AuthService] Wrong password: ${id}\n`);
            return { status, user, errors, message };
        };
        
        console.log(`[AuthService] User successfully loaded, updating: ${id}\n`);
        const updateResult = await UserService.update(id, updates);

        userModel = updateResult.userModel;
        if (userModel) {
            user = userModel.toJSON();
        };
        status = updateResult.status;
        errors = updateResult.errors;
        message = updateResult.message;

        return { status, user, errors, message };
    };
};

export default AuthService;