// pchips-v3/src/config/core/ConfigService.ts

import { ETableStatus } from "../../../db/dbIndex";
import { TErrorList } from "../../common/commonIndex";
import { SettingsService, TableService, TConfigService, TSettingsData, TSettingsModel, TSettingsUpdates } from "../configIndex";

class ConfigService {
    public static async createTable(errors: TErrorList, roomId: number): Promise<TConfigService> {
        const { tableModel, tableData } = await TableService.create(errors, roomId);
        let settingsModel: TSettingsModel = null;
        let settingsData: TSettingsData = null;

        if (tableData) {
            const settingsCreateResult = await SettingsService.create(errors, tableData.id);
            settingsModel = settingsCreateResult.settingsModel;
            settingsData = settingsCreateResult.settingsData;
        };

        return { tableModel, tableData, settingsModel, settingsData };
    };

    public static async updateSettings(errors: TErrorList, tableId: number, updates: TSettingsUpdates): Promise<TConfigService> {
        const { tableModel, tableData } = await TableService.get(errors, tableId);
        const { settingsModel, settingsData } = await SettingsService.update(errors, tableId, updates);

        return { tableModel, tableData, settingsModel, settingsData };
    };

    public static async runTable(errors: TErrorList, tableId: number): Promise<TConfigService> {
        const updates = { status: ETableStatus.RUNNING };
        const { tableModel, tableData } = await TableService.update(errors, tableId, updates);
        const { settingsModel, settingsData } = await SettingsService.get(errors, tableId);

        return { tableModel, tableData, settingsModel, settingsData };
    };

    public static async pauseTable(errors: TErrorList, tableId: number): Promise<TConfigService> {
        const updates = { status: ETableStatus.PAUSED };
        const { tableModel, tableData } = await TableService.update(errors, tableId, updates);
        const { settingsModel, settingsData } = await SettingsService.get(errors, tableId);

        return { tableModel, tableData, settingsModel, settingsData };
    };

    public static async finishTable(errors: TErrorList, tableId: number): Promise<TConfigService> {
        const updates = { status: ETableStatus.FINISHED };
        const { tableModel, tableData } = await TableService.update(errors, tableId, updates);
        const { settingsModel, settingsData } = await SettingsService.get(errors, tableId);

        return { tableModel, tableData, settingsModel, settingsData };
    };
};

export default ConfigService;