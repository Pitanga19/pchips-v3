// pchips-v3/src/room/core/RoomMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { EResponseStatus, handleResponseStatus, TErrorList } from '../../common/commonIndex';
import { validateDifferentUsers } from '../roomIndex';

class RoomMiddleware {
    public static validateAddUserInputs(req: Request, res: Response, next: NextFunction): void {
        const { actorId, targetId } = req.body;
        const roomModel = null;
        const roomData = null;
        const userModel = null;
        const userData = null;
        const roomUserModel = null;
        const roomUserData = null;
        const errors: TErrorList = [];

        validateDifferentUsers(errors, actorId, targetId);

        if (errors.length > 0) {
            const expectedOk = EResponseStatus.SUCCESS;
            const status = handleResponseStatus(errors, expectedOk);
            res.status(status).json({ roomModel, roomData, userModel, userData, roomUserModel, roomUserData, errors });
            return;
        };

        next();
    };
};

export default RoomMiddleware;