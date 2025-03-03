// pchips-v3/src/common/utils/commonUtils.ts

import { Model } from "sequelize";
import { TErrorList } from "../commonIndex";

export const showLog = (file: string, message: string, details: object, success: boolean = true) => {
    const status = success ? '✅' : '❌';
    console.log(`[${file}] ${status} ${message}: ${JSON.stringify(details)}`);
};

export const extractToJSON = (model: Model | null) => {
    return model ? model.toJSON() : null;
};

export const showErrors = (errors: TErrorList, file: string) => {
    console.log(`[${ file }] Showing errors result:`, errors);
};

export const showAndResetErrors = (errors: TErrorList, file: string) => {
    showErrors(errors, file);
    return [];
};