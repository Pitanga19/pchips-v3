// pchips-v3/src/auth/core/AuthMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import {
    EAuthProcess, validateUsername, validateEmail, validatePassword, validateExistingInputs, validateUserFind, validateRepeatPassword, validateExistingUpdates, TRegisterBody, TLoginBody, TRecoverBody, TUpdateBody,
} from '../authIndex';
import { TErrorList, EResponseStatus, EResponseMessage } from '../../common/commonIndex';

class AuthMiddleware {
    public static validateRegisterInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { username, email, password, repeatPassword }: TRegisterBody = req.body;
        const status = EResponseStatus.BAD_REQUEST;
        const user = null;
        const errors: TErrorList = [];
        const receivedInputs = { username, email, password, repeatPassword };
        
        validateExistingInputs(EAuthProcess.REGISTER, errors, receivedInputs);
        if (username) validateUsername(errors, username);
        if (email) validateEmail(errors, email);
        if (password) {
            validatePassword(errors, password);
            if (repeatPassword) validateRepeatPassword(errors, password, repeatPassword);
        };
            
        if (errors.length > 0) {
            const message = EResponseMessage.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateLoginInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { username, password }: TLoginBody = req.body;
        const status = EResponseStatus.BAD_REQUEST;
        const user = null;
        const errors: TErrorList = [];
        const receivedInputs = { username, password };
        
        validateExistingInputs(EAuthProcess.LOGIN, errors, receivedInputs);

        if (errors.length > 0) {
            const message = EResponseMessage.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateRecoverInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { findedType, findedValue }: TRecoverBody = req.body;
        const status = EResponseStatus.BAD_REQUEST;
        const user = null;
        const errors: TErrorList = [];
        const receivedInputs = { findedType, findedValue };
        
        validateExistingInputs(EAuthProcess.RECOVERY, errors, receivedInputs);
        if (findedType) validateUserFind(errors, findedType);

        if (errors.length > 0) {
            const message = EResponseMessage.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateUpdateInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { id, password, updates, repeatPassword }: TUpdateBody = req.body;
        const status = EResponseStatus.BAD_REQUEST;
        const user = null;
        const errors: TErrorList = [];
        const receivedInputs = { id, password, updates, repeatPassword };
        console.log('\n\nValidating update inputs ...\n\n');
        console.log(JSON.stringify(req.body));

        validateExistingInputs(EAuthProcess.UPDATE, errors, receivedInputs);
        validateExistingUpdates(updates);

        if (updates) {
            if (updates.username) {
                validateUsername(errors, updates.username);
            };
            if (updates.email) {
                validateEmail(errors, updates.email);
            };
            if (updates.password) {
                validatePassword(errors, updates.password);
                validateRepeatPassword(errors, updates.password, repeatPassword);
            };
        };
            
        if (errors.length > 0) {
            const message = EResponseMessage.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };
};

export default AuthMiddleware;