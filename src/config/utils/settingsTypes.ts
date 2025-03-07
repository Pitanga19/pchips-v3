// pchips-v3/src/settings/utils/settingsTypes.ts

import { ISettings, SettingsModel } from "../../../db/dbIndex";

export type TSettingsModel = SettingsModel | null;
export type TSettingsData = ISettings | null;

export type TSettingsService = {
    settingsModel: TSettingsModel;
    settingsData: TSettingsData;
};

export type TSettingsUpdates = Omit<Partial<ISettings>, 'id' | 'gameId'>;

export type TSettingsBody = { gameId: number };
export type TSettingsUpdateBody = { gameId: number, updates: TSettingsUpdates };