// pchips-v3/src/common/utils/commonUtils.ts

import { Model } from "sequelize";

export const showLog = (file: string, message: string, details: object, success: boolean = true) => {
    const status = success ? '✅' : '❌';
    console.log(`[${file}] ${status} ${message}: ${JSON.stringify(details)}\n`);
};

export const extractToJSON = (model: Model | null) => {
    return model ? model.toJSON() : null;
};