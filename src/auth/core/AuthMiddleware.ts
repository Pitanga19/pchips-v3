// pchips-v3/src/auth/core/AuthMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import {
    EAuthProcess, validateUsername, validateEmail, validatePassword, validateExistingInputs, validateUserFindType, validateRepeatPassword, validateExistingUpdates, TRegisterBody, TLoginBody, TRecoverPasswordBody, TUpdateBody,
    TUserModel,
    TUserData,
    TDeleteAccountBody,
} from '../authIndex';
import { TErrorList, EResponseStatus, EResponseMessage } from '../../common/commonIndex';

class AuthMiddleware {
    
    public static validateRegisterInputs = (req: Request, res: Response, next: NextFunction): void => {
        const receivedInputs: TRegisterBody = req.body;
        const { username, email, password, repeatPassword } = receivedInputs;
        const status = EResponseStatus.BAD_REQUEST;
        const userModel: TUserModel = null;
        const userData: TUserData = null;
        const errors: TErrorList = [];

        validateExistingInputs(errors, EAuthProcess.REGISTER, receivedInputs);
        if (username) validateUsername(errors, username);
        if (email) validateEmail(errors, email);
        if (password) {
            validatePassword(errors, password);
            if (repeatPassword) validateRepeatPassword(errors, password, repeatPassword);
        };

        if (errors.length > 0) {
            res.status(status).json({ userModel, userData, errors });
            return;
        };

        next();
    };

    public static validateLoginInputs = (req: Request, res: Response, next: NextFunction): void => {
        const receivedInputs: TLoginBody = req.body;
        const { username, password } = receivedInputs;
        const status = EResponseStatus.BAD_REQUEST;
        const userModel: TUserModel = null;
        const userData: TUserData = null;
        const errors: TErrorList = [];

        validateExistingInputs(errors, EAuthProcess.LOGIN, receivedInputs);
        if (username) validateUsername(errors, username);
        if (password) validatePassword(errors, password);

        if (errors.length > 0) {
            res.status(status).json({ userModel, userData, errors });
            return;
        };

        next();
    };

    public static validateRecoverInputs = (req: Request, res: Response, next: NextFunction): void => {
        const receivedInputs: TRecoverPasswordBody = req.body;
        const { findedType } = receivedInputs;
        const status = EResponseStatus.BAD_REQUEST;
        const userModel: TUserModel = null;
        const userData: TUserData = null;
        const errors: TErrorList = [];
        
        validateExistingInputs(errors, EAuthProcess.RECOVER_PASSWORD, receivedInputs);
        if (findedType) validateUserFindType(errors, findedType);

        if (errors.length > 0) {
            res.status(status).json({ userModel, userData, errors });
            return;
        };

        next();
    };

    public static validateUpdateInputs = (req: Request, res: Response, next: NextFunction): void => {
        const receivedInputs: TUpdateBody = req.body;
        const { password, updates, repeatPassword } = receivedInputs;
        const status = EResponseStatus.BAD_REQUEST;
        const userModel: TUserModel = null;
        const userData: TUserData = null;
        const errors: TErrorList = [];

        console.log('\n\nValidating update inputs ...\n\n');
        console.log(JSON.stringify(req.body));

        validateExistingInputs(errors, EAuthProcess.UPDATE, receivedInputs);
        validateExistingUpdates(updates);
        
        if (password) validatePassword(errors, password);
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
            res.status(status).json({ userModel, userData, errors });
            return;
        };

        next();
    };

    public static validateDeleteInputs = (req: Request, res: Response, next: NextFunction): void => {
        const receivedInputs: TDeleteAccountBody = req.body;
        const { password } = receivedInputs;
        const status = EResponseStatus.BAD_REQUEST;
        const userModel: TUserModel = null;
        const userData: TUserData = null;
        const errors: TErrorList = [];

        console.log('\n\nValidating update inputs ...\n\n');
        console.log(JSON.stringify(req.body));

        validateExistingInputs(errors, EAuthProcess.UPDATE, receivedInputs);

        if (password) validatePassword(errors, password);

        if (errors.length > 0) {
            res.status(status).json({ userModel, userData, errors });
            return;
        };

        next();
    };
};

export default AuthMiddleware;