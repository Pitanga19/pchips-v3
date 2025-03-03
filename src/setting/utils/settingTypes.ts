// pchips-v3/src/setting/utils/settingTypes.ts

import { ISetting, SettingModel } from "../../../db/dbIndex";

export type TSettingModel = SettingModel | null;
export type TSettingData = ISetting | null;

export type TSettingService = {
    settingModel: TSettingModel;
    settingData: TSettingData;
};

export type TSettingUpdates = Omit<Partial<ISetting>, 'id' | 'gameId'>;

export type TSettingBody = { gameId: number };
export type TSettingUpdateBody = { gameId: number, updates: TSettingUpdates };