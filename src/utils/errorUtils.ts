// pchips-v3/src/utils/errorUtils.ts

import { TErrorList } from "./types/errorTypes";
import { EErrorField, EErrorMessage } from "./enums/errorEnums";

export const addToResponseErrors = (errors: TErrorList, receivedField: EErrorField, receivedMessage: EErrorMessage) => {
    const field = receivedField;
    const message = receivedMessage;
    errors.push({ field, message });
};

