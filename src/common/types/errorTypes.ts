// pchips-v3/src/common/types/errorTypes.ts

import { EErrorField, EErrorMessage } from '../commonIndex';

export type TError = {
    field: EErrorField,
    message: EErrorMessage,
};

export type TErrorList = TError[];