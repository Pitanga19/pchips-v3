// pchips-v3/src/setting/core/SettingService.ts

import { TSettingData, TSettingModel, TSettingService, TSettingUpdates } from '../settingIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from '../../common/commonIndex';
import { SettingModel } from '../../../db/dbIndex';

class SettingService {
    private static async find(errors: TErrorList, gameId: number, expectedExists: boolean): Promise<TSettingModel> {
        const settingModel = await SettingModel.findOne({ where: { gameId } });
        
        if (!settingModel && expectedExists) {
            console.log(`Setting not found: gameId: ${gameId}`);
            const field = EErrorField.SETTING;
            const message = EErrorMessage.NOT_FOUND;
            addToResponseErrors(errors, field, message);
        } else if (settingModel && !expectedExists) {
            console.log(`Setting already exists: gameId: ${gameId}`);
            const field = EErrorField.SETTING;
            const message = EErrorMessage.ALREADY_EXIST;
            addToResponseErrors(errors, field, message);
        };

        return settingModel;
    };

    public static async create(errors: TErrorList, gameId: number): Promise<TSettingService> {
        let settingModel: TSettingModel = null;
        let settingData: TSettingData = null;
        
        const expectedExists = false;
        await this.find(errors, gameId, expectedExists);

        if (errors.length === 0) {
            settingModel = await SettingModel.create({ gameId });
            settingData =settingModel.toJSON();
        };

        return { settingModel, settingData };
    };

    public static async get(errors: TErrorList, gameId: number): Promise<TSettingService> {
        const expectedExists = true;
        const settingModel = await this.find(errors, gameId, expectedExists);
        const settingData: TSettingData = settingModel ? settingModel.toJSON() : null;

        return { settingModel, settingData };
    };

    public static async update(errors: TErrorList, gameId: number, updates: TSettingUpdates): Promise<TSettingService> {
        const expectedExists = true;
        let settingData: TSettingData = null;

        const settingModel = await this.find(errors, gameId, expectedExists);

        if (errors.length === 0 && settingModel) {
            await settingModel.update(updates);
            settingData = settingModel.toJSON();
        };

        return { settingModel, settingData };
    };
};

export default SettingService;