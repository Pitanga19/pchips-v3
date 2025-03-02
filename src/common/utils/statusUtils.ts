// pchips-v3/src/common/utils/statusUtils.ts

import { TErrorList, EResponseStatus, mapErrorsToStatuses, getMostImportantStatus } from '../commonIndex';

export const handleResponseStatus = (errors: TErrorList, expectedOk: EResponseStatus): EResponseStatus => {
    let status: EResponseStatus = expectedOk;

    if (errors.length > 0) {
        const statusList = mapErrorsToStatuses(errors);
        status = getMostImportantStatus(statusList);
    };

    return status;
};