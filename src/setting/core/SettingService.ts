// pchips-v3/src/setting/core/SettingService.ts

import { TSettingData, TSettingModelReturn, TSettingServiceReturn, TSettingUpdates } from '../settingIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from '../../common/commonIndex';
import { SettingModel } from '../../../db/dbIndex';

class SettingService {
    private static async find(gameId: number, errors: TErrorList, expectedExists: boolean): Promise<TSettingModelReturn> {
        const settingModel = await SettingModel.findOne({ where: { gameId } });
        
        if (!settingModel && expectedExists) {
            console.log(`Setting not found: gameId: ${gameId}`);
            const field = EErrorField.SETTING;
            const message = EErrorMessage.SETTING_NOT_FOUND;
            addToResponseErrors(errors, field, message);
        } else if (settingModel && !expectedExists) {
            console.log(`Setting already exists: gameId: ${gameId}`);
            const field = EErrorField.SETTING;
            const message = EErrorMessage.EXISTING_SETTING;
            addToResponseErrors(errors, field, message);
        };

        return settingModel;
    };

    public static async create(gameId: number): Promise<TSettingServiceReturn> {
        const errors: TErrorList = [];
        const expectedExists = false;
        let settingModel: TSettingModelReturn = null;
        let settingData: TSettingData = null;

        await this.find(gameId, errors, expectedExists);

        if (errors.length === 0) {
            settingModel = await SettingModel.create({ gameId });
            settingData =settingModel.toJSON();
        };

        return { settingModel, settingData, errors };
    };

    public static async get(gameId: number): Promise<TSettingServiceReturn> {
        const errors: TErrorList = [];
        const expectedExists = true;
        const settingModel = await this.find(gameId, errors, expectedExists);
        const settingData: TSettingData = settingModel ? settingModel.toJSON() : null;

        return { settingModel, settingData, errors };
    };

    public static async update(gameId: number, updates: TSettingUpdates): Promise<TSettingServiceReturn> {
        const errors: TErrorList = [];
        const expectedExists = true;
        let settingData: TSettingData = null;

        const settingModel = await this.find(gameId, errors, expectedExists);

        if (errors.length === 0 && settingModel) {
            await settingModel.update(updates);
            settingData = settingModel.toJSON();
        };

        return { settingModel, settingData, errors };
    };
};

export default SettingService;