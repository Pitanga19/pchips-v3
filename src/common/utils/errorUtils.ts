// pchips-v3/src/common/utils/errorUtils.ts

import { TErrorList, EErrorField, EErrorMessage, EResponseStatus } from '../commonIndex';

export const addToResponseErrors = (errors: TErrorList, receivedField: EErrorField, receivedMessage: EErrorMessage) => {
    const field = receivedField;
    const message = receivedMessage;
    errors.push({ field, message });
};

export const errorStatusMap: Record<EErrorMessage, EResponseStatus> = {
    [EErrorMessage.DATA_IS_MISSING]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.CHAR_EXCESS]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.NOT_ENOUGH_CHARS]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.NOT_ALPHANUMERIC]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.NOT_EMAIL_FORMAT]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.INVALID_DATA]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.NOT_SAME_PASSWORD]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.RELATION_ACCEPTED]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.RELATION_PENDING]: EResponseStatus.BAD_REQUEST,
    [EErrorMessage.WRONG_SENDER]: EResponseStatus.BAD_REQUEST,

    [EErrorMessage.WRONG_PASSWORD]: EResponseStatus.UNAUTHORIZED,
    [EErrorMessage.INSUFFICIENT_PERMISSIONS]: EResponseStatus.UNAUTHORIZED,

    [EErrorMessage.NOT_FOUND]: EResponseStatus.NOT_FOUND,

    [EErrorMessage.ALREADY_EXISTS]: EResponseStatus.CONFLICT,
    [EErrorMessage.SAME_USER]: EResponseStatus.CONFLICT,
    [EErrorMessage.IS_OWNER]: EResponseStatus.CONFLICT,

    [EErrorMessage.INTERNAL_SERVER_ERROR]: EResponseStatus.INTERNAL_SERVER_ERROR,
};

export const mapErrorsToStatuses = (errors: TErrorList): EResponseStatus[] => {
    return errors.map(error => errorStatusMap[error.message]);
};

const statusHierarchy: EResponseStatus[] = [
    EResponseStatus.INTERNAL_SERVER_ERROR,
    EResponseStatus.UNAUTHORIZED,
    EResponseStatus.CONFLICT,
    EResponseStatus.NOT_FOUND,
    EResponseStatus.BAD_REQUEST,
];

export const getMostImportantStatus = (statusList: EResponseStatus[]): EResponseStatus => {
    const status = statusHierarchy.find(hierarchyStatus => statusList.includes(hierarchyStatus));

    return status || EResponseStatus.INTERNAL_SERVER_ERROR;
};