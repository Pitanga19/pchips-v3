// pchips-v3/src/auth/core/UserService.ts

import { TUserServiceReturn, TUserDeleteReturn, TUserUpdates} from '../authIndex';
import {
    addToResponseErrors, EErrorField, EErrorMessage, EResponseMessage, EResponseStatus, TErrorList,
} from '../../common/commonIndex';
import { UserModel } from '../../../db/dbIndex';

class UserService {
    // Create user
    public static async create(username: string, email: string, password: string): Promise<TUserServiceReturn> {
        const getByUsername = await this.getByUsername(username);
        const getByEmail = await this.getByEmail(email);
        const errors: TErrorList = [];
        let status = EResponseStatus.CREATED;
        let userModel: UserModel | null = null;
        let message = EResponseMessage.CREATED;

        if (getByUsername.userModel) {
            console.log(`[UserService] Username already exist: ${username}`);
            status = EResponseStatus.CONFLICT;
            message = EResponseMessage.INVALID_DATA;
            addToResponseErrors(errors, EErrorField.USERNAME, EErrorMessage.EXISTING_USERNAME);
        };

        if (getByEmail.userModel) {
            console.log(`[UserService] Email already exist: ${email}`);
            status = EResponseStatus.CONFLICT;
            message = EResponseMessage.INVALID_DATA;
            addToResponseErrors(errors, EErrorField.EMAIL, EErrorMessage.EXISTING_EMAIL);
        };

        if (errors.length === 0) {
            userModel = await UserModel.create({ username, email, password });

            if (!userModel) {
                console.log(`[UserService] Error creating user: ${username}`);
                const status = EResponseStatus.INTERNAL_SERVER_ERROR;
                const message = EResponseMessage.INTERNAL_SERVER_ERROR;
                return { userModel, status, errors: [], message };
            };
            
            console.log(`[UserService] User successfully created: ${JSON.stringify(userModel.toJSON())}`);
        };

        return { userModel, status, errors, message };
    };

    // Get user by id
    public static async getById(id: number): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findByPk(id);
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;
        const field: EErrorField = EErrorField.ID;
        const errors: TErrorList = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            status = EResponseStatus.NOT_FOUND;
            userModel = null;
            message = EResponseMessage.INVALID_DATA;

            addToResponseErrors(errors, field, EErrorMessage.USER_NOT_FOUND);
            return { userModel, status, errors, message };
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { id: ${id} }`);
        return { userModel, status, errors, message };
    };

    // Get user by username
    public static async getByUsername(username: string): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findOne({ where: { username } });
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;
        const field: EErrorField = EErrorField.USERNAME;
        const errors: TErrorList = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { username: ${username} }`);
            status = EResponseStatus.NOT_FOUND;
            userModel = null;
            message = EResponseMessage.INVALID_DATA;
            
            addToResponseErrors(errors, field, EErrorMessage.USER_NOT_FOUND);
            return { userModel, status, errors, message };
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { username: ${username} }`);
        return { userModel, status, errors, message };
    };

    // Get user by email
    public static async getByEmail(email: string): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findOne({ where: { email } });
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;
        const field: EErrorField = EErrorField.EMAIL;
        const errors: TErrorList = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { email: ${email} }`);
            status = EResponseStatus.NOT_FOUND;
            userModel = null;
            message = EResponseMessage.INVALID_DATA;
            
            addToResponseErrors(errors, field, EErrorMessage.USER_NOT_FOUND);
        };

        if (errors.length === 0) console.log(`[UserService] User succefully loaded: { email: ${email} }`);
        return { userModel, status, errors, message };
    };

    public static async validatePassword(user: UserModel, password: string): Promise<TUserServiceReturn> {
        let status = EResponseStatus.SUCCESS;
        let userModel: UserModel | null = user;
        let message = EResponseMessage.SUCCESS;
        const field = EErrorField.PASSWORD;
        const errors: TErrorList = [];
        const isValidPassword: boolean = await userModel.comparePassword(password);

        if (!isValidPassword) {
            console.log('[AuthService] Wrong password!\n');
            status = EResponseStatus.UNAUTHORIZED;
            userModel = null;
            message = EResponseMessage.INVALID_DATA;

            addToResponseErrors(errors, field, EErrorMessage.WRONG_PASSWORD);
        };

        if (errors.length === 0) console.log('[AuthService] Is correct password!\n');
        return { userModel, status, errors, message };
    };

    // Update user
    public static async update(id: number, updates: TUserUpdates): Promise<TUserServiceReturn> {
        let userModel = await UserModel.findByPk(id);
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;
        const field: EErrorField = EErrorField.ID;
        const errors: TErrorList = [];
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            userModel = null;
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.INVALID_DATA;

            addToResponseErrors(errors, field, EErrorMessage.USER_NOT_FOUND);
        };
        
        if (updates.username) {
            const getByUsername = await this.getByUsername(updates.username);

            if (getByUsername.userModel) {
                console.log(`[UserService] Username already exist: ${updates.username}`);
                userModel = null;
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;

                addToResponseErrors(errors, EErrorField.USERNAME, EErrorMessage.EXISTING_USERNAME);
            };
        };
        
        if (updates.email) {
            const getByEmail = await this.getByEmail(updates.email);

            if (getByEmail.userModel) {
                console.log(`[UserService] Email already exist: ${updates.email}`);
                userModel = null;
                status = EResponseStatus.CONFLICT;
                message = EResponseMessage.INVALID_DATA;

                addToResponseErrors(errors, EErrorField.EMAIL, EErrorMessage.EXISTING_EMAIL);
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
        const field: EErrorField = EErrorField.ID;
        const errors: TErrorList = [];
        let status = EResponseStatus.SUCCESS;
        let message = EResponseMessage.SUCCESS;
        let value: boolean = true;
        
        if (!userModel) {
            console.log(`[UserService] User not found: { id: ${id} }`);
            value = false;
            status = EResponseStatus.NOT_FOUND;
            message = EResponseMessage.INVALID_DATA;

            addToResponseErrors(errors, field, EErrorMessage.USER_NOT_FOUND);
        };

        if (userModel !== null) {
            console.log(`[UserService] User succefully loaded: { id: ${id} }`);
            await userModel.destroy();
        };
        return { value, status, errors, message };
    };
};

export default UserService;