// pchips-v3/src/config/utils/configTypes.ts

import { TSettingsData, TSettingsModel } from "./settingsTypes"
import { TTableData, TTableModel } from "./tableTypes"

export type TConfigService = {
    tableModel: TTableModel,
    tableData: TTableData,
    settingsModel: TSettingsModel,
    settingsData: TSettingsData,
};