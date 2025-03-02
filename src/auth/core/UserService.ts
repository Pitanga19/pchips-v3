// pchips-v3/src/auth/core/UserService.ts

import { TUserService, TUserDelete, TUserUpdates, TUserData, TUserModel, TUserFindData, TUserFindResult, validateCorrectPassword, ESafeword, validateCorrectSafeword} from '../authIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, extractToJSON, showLog, TErrorList } from '../../common/commonIndex';
import { UserModel } from '../../../db/dbIndex';
const file = 'UserService';

class UserService {
    // Find user
    private static async findUser(data: TUserFindData): Promise<TUserFindResult> {
        let userById: TUserService = { userModel: null, userData: null };
        let userByUsername: TUserService = { userModel: null, userData: null };
        let userByEmail: TUserService = { userModel: null, userData: null };
        const { id, username, email } = data;

        if (id) {
            const userModel = await UserModel.findByPk(id);
            const userData = extractToJSON(userModel);
            userById = { userModel, userData };
        };
        if (username) {
            const userModel = await UserModel.findOne({ where: { username } });
            const userData = extractToJSON(userModel);
            userByUsername = { userModel, userData };
        };
        if (email) {
            const userModel = await UserModel.findOne({ where: { email } });
            const userData = extractToJSON(userModel);
            userByEmail = { userModel, userData };
        };

        return { userById, userByUsername, userByEmail };
    };

    // Validate find result
    private static validateFindResult(errors: TErrorList, data: TUserFindData, findResult: TUserFindResult, shouldExists: boolean): void {
        const { userById, userByUsername, userByEmail } = findResult;
    
        if (shouldExists && !userById.userModel && !userByUsername.userModel && !userByEmail.userModel) {
            showLog(file, 'User not found', data, false);
            addToResponseErrors(errors, EErrorField.USER, EErrorMessage.NOT_FOUND);
        } else if (!shouldExists) {
            const { id, username, email } = data;
            const logMessage = 'User already exist';
            if (userById.userModel) {
                showLog(file, logMessage, { id }, false);
                addToResponseErrors(errors, EErrorField.ID, EErrorMessage.ALREADY_EXIST);
            };
            if (userByUsername.userModel) {
                showLog(file, logMessage, { username }, false);
                addToResponseErrors(errors, EErrorField.USERNAME, EErrorMessage.ALREADY_EXIST);
            };
            if (userByEmail.userModel) {
                showLog(file, logMessage, { email }, false);
                addToResponseErrors(errors, EErrorField.EMAIL, EErrorMessage.ALREADY_EXIST);
            };
        };
    };

    // Find user and validate
    public static async find(errors: TErrorList, data: TUserFindData, shouldExists: boolean): Promise<TUserFindResult> {
        const findResult = await this.findUser(data);
        this.validateFindResult(errors, data, findResult, shouldExists);
        return findResult;
    };

    // Create user
    public static async create(errors: TErrorList, username: string, email: string, password: string): Promise<TUserService> {
        const findResult = await this.find(errors, { username, email }, false);
        let userModel: TUserModel = null;
        let userData: TUserData = null;

        if (errors.length === 0) {
            userModel = await UserModel.create({ username, email, password });

            if (!userModel) {
                showLog(file, 'Error creating user', { username, email }, false);
                addToResponseErrors(errors, EErrorField.USER, EErrorMessage.INTERNAL_SERVER_ERROR);
            } else {
                userData = userModel.toJSON();
                showLog(file, 'User successfully created', userData, true);
            };
        };

        return { userModel, userData };
    };

    // Get user by id
    public static async getById(errors: TErrorList, id: number): Promise<TUserService> {
        let { userById } = await this.find(errors, { id }, true);

        if (errors.length === 0) showLog(file, 'User successfully loaded', { id }, true);
        return userById;
    };

    // Get user by username
    public static async getByUsername(errors: TErrorList, username: string): Promise<TUserService> {
        let { userByUsername } = await this.find(errors, { username }, true);

        if (errors.length === 0) showLog(file, 'User successfully loaded', { username }, true);
        return userByUsername;
    };

    // Get user by email
    public static async getByEmail(errors: TErrorList, email: string): Promise<TUserService> {
        let { userByEmail } = await this.find(errors, { email }, true);

        if (errors.length === 0) showLog(file, 'User successfully loaded', { email }, true);
        return userByEmail;
    };

    // Update user after password validate
    public static async update(errors: TErrorList, id: number, password: string, updates: TUserUpdates): Promise<TUserService> {
        const { userById } = await this.find(errors, { id }, true);
        const { userModel } = userById;
        let { userData } = userById;

        if (errors.length === 0 && (updates.username || updates.email)) {
            await this.find(errors, updates, false);
        };

        if (errors.length === 0 && userModel && userData) {
            showLog(file, 'User successfully loaded', userData, true);

            const isCorrectPassword = await validateCorrectPassword(errors, userModel, password);
            if (isCorrectPassword) {
                await userModel.update(updates);
                userData = userModel.toJSON();
                showLog(file, 'User successfully updated', userData, true);
            };
        };

        return { userModel, userData };
    };

    // Delete user
    public static async delete(errors: TErrorList, id: number, password: string, safeword: string): Promise<TUserDelete> {
        const { userById } = await this.find(errors, { id }, true);
        const { userModel } = userById;
        let deleted: boolean = false;

        if (errors.length === 0 && userModel) {
            showLog(file, 'User successfully loaded', { id }, true);

            const isCorrectPassword = await validateCorrectPassword(errors, userModel, password);
            const isCorrectSafeword = validateCorrectSafeword(errors, ESafeword.DELETE_ACCOUNT, safeword);
            if (isCorrectPassword && isCorrectSafeword) {
                await userModel.destroy();
                deleted = true;
                showLog(file, 'User successfully deleted', { id }, true);
            };
        };

        return { deleted };
    };
};

export default UserService;