// pchips-v3/src/setting/utils/settingTypes.ts

import { EBlindIncreaseType, EBlindLevel, ERebuyAddon, EStartingChipsType, ETableSize, ISetting, SettingModel } from "../../../db/dbIndex";
import { TErrorList } from "../../common/commonIndex";

export type TSettingModelReturn = SettingModel | null;
export type TSettingData = ISetting | null;

export type TSettingServiceReturn = {
    settingModel: TSettingModelReturn;
    settingData: TSettingData;
    errors: TErrorList;
};

export type TSettingUpdates = Omit<Partial<ISetting>, 'id' | 'gameId'>;