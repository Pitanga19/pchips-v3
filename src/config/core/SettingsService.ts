// pchips-v3/src/config/core/SettingsService.ts

import { TSettingsData, TSettingsModel, TSettingsService, TSettingsUpdates } from '../configIndex';
import { addToResponseErrors, EErrorField, EErrorMessage, TErrorList } from '../../common/commonIndex';
import { SettingsModel } from '../../../db/dbIndex';

class SettingsService {
    private static async find(errors: TErrorList, tableId: number, expectedExists: boolean): Promise<TSettingsModel> {
        const settingsModel = await SettingsModel.findOne({ where: { tableId } });
        
        if (!settingsModel && expectedExists) {
            console.log(`Settings not found: tableId: ${tableId}`);
            const field = EErrorField.SETTINGS;
            const message = EErrorMessage.NOT_FOUND;
            addToResponseErrors(errors, field, message);
        } else if (settingsModel && !expectedExists) {
            console.log(`Settings already exists: tableId: ${tableId}`);
            const field = EErrorField.SETTINGS;
            const message = EErrorMessage.ALREADY_EXIST;
            addToResponseErrors(errors, field, message);
        };

        return settingsModel;
    };

    public static async create(errors: TErrorList, tableId: number): Promise<TSettingsService> {
        let settingsModel: TSettingsModel = null;
        let settingsData: TSettingsData = null;
        
        const expectedExists = false;
        await this.find(errors, tableId, expectedExists);

        if (errors.length === 0) {
            settingsModel = await SettingsModel.create({ tableId });
            settingsData =settingsModel.toJSON();
        };

        return { settingsModel, settingsData };
    };

    public static async get(errors: TErrorList, tableId: number): Promise<TSettingsService> {
        const expectedExists = true;
        const settingsModel = await this.find(errors, tableId, expectedExists);
        const settingsData: TSettingsData = settingsModel ? settingsModel.toJSON() : null;

        return { settingsModel, settingsData };
    };

    public static async update(errors: TErrorList, tableId: number, updates: TSettingsUpdates): Promise<TSettingsService> {
        const expectedExists = true;
        let settingsData: TSettingsData = null;

        const settingsModel = await this.find(errors, tableId, expectedExists);

        if (errors.length === 0 && settingsModel) {
            await settingsModel.update(updates);
            settingsData = settingsModel.toJSON();
        };

        return { settingsModel, settingsData };
    };
};

export default SettingsService;