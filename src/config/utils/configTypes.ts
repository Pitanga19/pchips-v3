// pchips-v3/src/config/utils/configTypes.ts

import { TTableData, TTableModel, TSettingsData, TSettingsModel, TSettingsUpdates } from "../configIndex"

export type TConfigService = {
    tableModel: TTableModel,
    tableData: TTableData,
    settingsModel: TSettingsModel,
    settingsData: TSettingsData,
};

export type TConfigBody = { tableId: number };
export type TConfigCreateBody = { roomId: number };
export type TConfigUpdateBody = {
    tableId: number,
    updates: TSettingsUpdates,
};