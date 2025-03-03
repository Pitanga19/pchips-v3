// pchips-v3/src/party/core/PartyMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';
import { validateDifferentUsers } from '../partyIndex';

class PartyMiddleware {
    public static validateAddUserInputs(req: Request, res: Response, next: NextFunction): void {
        const { actorId, targetId } = req.body;
        const partyModel = null;
        const partyData = null;
        const userModel = null;
        const userData = null;
        const partyUserModel = null;
        const partyUserData = null;
        const errors: TErrorList = [];

        validateDifferentUsers(errors, actorId, targetId);

        if (errors.length > 0) {
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            res.status(status).json({ partyModel, partyData, userModel, userData, partyUserModel, partyUserData, errors });
            return;
        };

        next();
    };
};

export default PartyMiddleware;