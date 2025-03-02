// pchips-v3/src/common/utils/errorUtils.ts

import { TErrorList, EErrorField, EErrorMessage, EResponseStatus } from '../commonIndex';

export const addToResponseErrors = (errors: TErrorList, receivedField: EErrorField, receivedMessage: EErrorMessage) => {
    const field = receivedField;
    const message = receivedMessage;
    errors.push({ field, message });
};