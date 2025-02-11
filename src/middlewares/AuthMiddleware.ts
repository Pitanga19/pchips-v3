// pchips-v3/src/middlewares/AuthMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { TRegisterBody, TLoginBody, TRecoverBody, TErrorsReturn, TModifyBody } from "../utils/types/authTypes";
import { EStatusHTTP, EAuthProcesses, EAuthResponse } from "../utils/enums/authEnums";
import { validateUsername, validateEmail, validatePassword, validateExistingInputs, validateFindedType, validateRepeatPassword, validateExistingUpdates } from "../utils/authUtils";

class AuthMiddleware {
    public static validateRegisterInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { username, email, password, repeatPassword }: TRegisterBody = req.body;
        const status = EStatusHTTP.BAD_REQUEST;
        const user = null;
        const errors: TErrorsReturn = [];
        const receivedInputs = { username, email, password, repeatPassword };
        
        validateExistingInputs(EAuthProcesses.REGISTER, errors, receivedInputs);
        if (username) validateUsername(errors, username);
        if (email) validateEmail(errors, email);
        if (password) {
            validatePassword(errors, password);
            if (repeatPassword) validateRepeatPassword(errors, password, repeatPassword);
        };
            
        if (errors.length > 0) {
            const message = EAuthResponse.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateLoginInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { username, password }: TLoginBody = req.body;
        const status = EStatusHTTP.BAD_REQUEST;
        const user = null;
        const errors: TErrorsReturn = [];
        const receivedInputs = { username, password };
        
        validateExistingInputs(EAuthProcesses.LOGIN, errors, receivedInputs);

        if (errors.length > 0) {
            const message = EAuthResponse.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateRecoverInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { findedType, findedValue }: TRecoverBody = req.body;
        const status = EStatusHTTP.BAD_REQUEST;
        const user = null;
        const errors: TErrorsReturn = [];
        const receivedInputs = { findedType, findedValue };
        
        validateExistingInputs(EAuthProcesses.RECOVERY, errors, receivedInputs);
        if (findedType) validateFindedType(errors, findedType);

        if (errors.length > 0) {
            const message = EAuthResponse.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };

    public static validateModifyInputs = (req: Request, res: Response, next: NextFunction): void => {
        const { id, password, updates, repeatPassword }: TModifyBody = req.body;
        const status = EStatusHTTP.BAD_REQUEST;
        const user = null;
        const errors: TErrorsReturn = [];
        const receivedInputs = { id, password, updates, repeatPassword };
        console.log('\n\nValidating modify inputs ...\n\n');
        console.log(JSON.stringify(req.body));

        validateExistingInputs(EAuthProcesses.MODIFY, errors, receivedInputs);
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
            const message = EAuthResponse.INVALID_DATA;
            res.status(status).json({ user, errors, message });
            return;
        };

        next();
    };
};

export default AuthMiddleware;