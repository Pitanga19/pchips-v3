// pchips-v3/src/services/UserService.ts

import UserModel from "../../db/models/UserModel";
import { EAuthResponse, EInputField, EStatusHTTP } from "../utils/enums/authEnums";
import { TUserServiceReturn, TUserDeleteReturn, TUserUpdates, TErrorReturn, TErrorsReturn } from "../utils/types/authTypes";

class UserService {
    // Create user
    public static async create(username: string, email: string, password: string): Promise<TUserServiceReturn> {
        const getByUsername = await this.getByUsername(username);
        const getByEmail = await this.getByEmail(email);
        const errors: TErrorsReturn = [];
        let status = EStatusHTTP.CREATED;
        let userModel: UserModel | null = null;
        let message = EAuthResponse.CREATED;

        if (getByUsername.userModel) {
            console.log(`[UserService] Username already exist: ${username}`);
            status = EStatusHTTP.CONFLICT;
            message = EAuthResponse.INVALID_DATA;
            const error: TErrorReturn = {
                field: EInputField.USERNAME,
                message: EAuthResponse.EXISTING_USERNAME,
            };
            errors.push(error);
        };

        if (getByEmail.userModel) {
            console.log(`[UserService] Email already exist: ${email}`);
            status = EStatusHTTP.CONFLICT;
            message = EAuthResponse.INVALID_DATA;
            const error: TErrorReturn = {
                field: EInputField.EMAIL,
                message: EAuthResponse.EXISTING_EMAIL,
            };
            errors.push(error);
        };

        if (errors.length === 0) {
            userModel = await UserModel.create({ username, email, password });

            if (!userModel) {
                console.log(`[UserService] Error creating user: ${username}`);
                const status = EStatusHTTP.INTERNAL_SERVER_ERROR;
                const message = EAuthResponse.INTERNAL_SERVER_ERROR;
                return { userModel, status, errors: [], message };
            };
            
            console.log(`[UserService] User successfully created: ${JSON.stringify(userModel.toJSON())}`);
        };

        return { userModel, status, errors, message };
    };

    // Get user by id
    public static async getById(id: number): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findByPk(id);
        let status = EStatusHTTP.SUCCESS;
        let message = EAuthResponse.SUCCESS;
        const field: EInputField = EInputField.ID;
        const errors: TErrorsReturn = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            status = EStatusHTTP.NOT_FOUND;
            userModel = null;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.USER_NOT_FOUND };
            errors.push(error);
            return { userModel, status, errors, message };
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { id: ${id} }`);
        return { userModel, status, errors, message };
    };

    // Get user by username
    public static async getByUsername(username: string): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findOne({ where: { username } });
        let status = EStatusHTTP.SUCCESS;
        let message = EAuthResponse.SUCCESS;
        const field: EInputField = EInputField.USERNAME;
        const errors: TErrorsReturn = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { username: ${username} }`);
            status = EStatusHTTP.NOT_FOUND;
            userModel = null;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.USER_NOT_FOUND };
            errors.push(error);
            return { userModel, status, errors, message };
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { username: ${username} }`);
        return { userModel, status, errors, message };
    };

    // Get user by email
    public static async getByEmail(email: string): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findOne({ where: { email } });
        let status = EStatusHTTP.SUCCESS;
        let message = EAuthResponse.SUCCESS;
        const field: EInputField = EInputField.EMAIL;
        const errors: TErrorsReturn = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { email: ${email} }`);
            status = EStatusHTTP.NOT_FOUND;
            userModel = null;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.USER_NOT_FOUND };
            errors.push(error);
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { email: ${email} }`);
        return { userModel, status, errors, message };
    };

    public static async validatePassword(user: UserModel, password: string): Promise<TUserServiceReturn> {
        let status = EStatusHTTP.SUCCESS;
        let userModel: UserModel | null = user;
        let message = EAuthResponse.SUCCESS;
        const field = EInputField.PASSWORD;
        const errors: TErrorsReturn = [];
        const isValidPassword: boolean = await userModel.comparePassword(password);

        if (!isValidPassword) {
            console.log('[AuthService] Wrong password!\n');
            status = EStatusHTTP.UNAUTHORIZED;
            userModel = null;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.WRONG_PASSWORD };
            errors.push(error);
        };

        if (errors.length === 0) console.log('[AuthService] Is correct password!\n');
        return { userModel, status, errors, message };
    };

    // Update user
    public static async update(id: number, updates: TUserUpdates): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findByPk(id);
        let status = EStatusHTTP.SUCCESS;
        let message = EAuthResponse.SUCCESS;
        const field: EInputField = EInputField.ID;
        const errors: TErrorsReturn = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            userModel = null;
            status = EStatusHTTP.NOT_FOUND;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.USER_NOT_FOUND };
            errors.push(error);
        };
        
        if (updates.username) {
            const getByUsername = await this.getByUsername(updates.username);

            if (getByUsername.userModel) {
                console.log(`[UserService] Username already exist: ${updates.username}`);
                userModel = null;
                status = EStatusHTTP.CONFLICT;
                message = EAuthResponse.INVALID_DATA;
                const error: TErrorReturn = {
                    field: EInputField.USERNAME,
                    message: EAuthResponse.EXISTING_USERNAME,
                };
                errors.push(error);
            };
        };
        
        if (updates.email) {
            const getByEmail = await this.getByEmail(updates.email);

            if (getByEmail.userModel) {
                console.log(`[UserService] Email already exist: ${updates.email}`);
                userModel = null;
                status = EStatusHTTP.CONFLICT;
                message = EAuthResponse.INVALID_DATA;
                const error: TErrorReturn = {
                    field: EInputField.EMAIL,
                    message: EAuthResponse.EXISTING_EMAIL,
                };
                errors.push(error);
            };
        };

        if (userModel !== null && errors.length === 0) {
            console.log(`[UserService] User succefully loaded: { id: ${id} }`);
            await userModel.update(updates);
        };
        return { userModel, status, errors, message };
    };

    // Delete user
    public static async delete(id: number): Promise<TUserDeleteReturn> {
        const userModel = await UserModel.findByPk(id);
        const field: EInputField = EInputField.ID;
        const errors: TErrorsReturn = [];
        let status = EStatusHTTP.SUCCESS;
        let message = EAuthResponse.SUCCESS;
        let value: boolean = true;
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            value = false;
            status = EStatusHTTP.NOT_FOUND;
            message = EAuthResponse.INVALID_DATA;

            const error: TErrorReturn = { field, message: EAuthResponse.USER_NOT_FOUND };
            errors.push(error);
        };

        if (userModel !== null) {
            console.log(`[UserService] User succefully loaded: { id: ${id} }`);
            await userModel.destroy();
        };
        return { value, status, errors, message };
    };
};

export default UserService;